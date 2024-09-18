import path from "path";
import { FileHandle } from "fs/promises";
import { Router, Request, Response } from "express";
import { openFile, writeFile, listDir } from "../../utilities/fileUtility";
import SharpUtility from "../../utilities/sharpUtility";

const FullDirectory: string = "assets/full";
const ThumbDirectory: string = "assets/thumb";

export type UploadImageProps = {
	fileName: string;
	data: string;
};

export default class ImageController {
	public router: Router;

	constructor() {
		this.router = Router();
		this.initRoutes();
	}

	private initRoutes() {
		this.router.get("/images", this.get);
		this.router.get("/images/list/:dir", this.list);
		this.router.post("/images", this.createImage);
	}

	/**
	 * This fetches an image based on the following query parameters
	 * filename (string, mandatory)
	 * width (number, mandatory)
	 * height (number, mandatory)
	 * @param req
	 * @param res
	 * @private
	 */
	private async get(req: Request, res: Response) {
		const fileName: string | null = req.query.filename
			? (req.query.filename as string).toLowerCase()
			: null;
		const width: number | null = req.query.width
			? Number(req.query.width)
			: null;
		const height: number | null = req.query.height
			? Number(req.query.height)
			: null;
		const fit: string | null = req.query.fit
			? (req.query.fit as string)
			: "contain";

		// First we make sure the query parameters provided are present
		if (!fileName || !width || !height) {
			res.status(400).json({
				message: `Invalid query params specified, please provide filename, width and height. Also, make sure width and height are numbers and not text strings`,
			});
			return;
		}
		const fileNameParts: string[] = fileName.split(".");
		const name: string = fileNameParts[0];
		const fileType: string = fileNameParts[1] ? fileNameParts[1] : "jpg";

		const thumbFileName: string = `${ThumbDirectory}/${name}_${width}_${height}_${fit}.${fileType}`;
		const fullFileName: string = `${FullDirectory}/${name}.${fileType}`;

		const thumbFile: FileHandle | null = await openFile(thumbFileName);

		if (!thumbFile) {
			console.log(
				`[INFO] thumb file ${thumbFileName} does not exist in cache, creating new image`,
			);
			const sharpUtility: SharpUtility = new SharpUtility();
			let fullFile: FileHandle | null = await openFile(fullFileName);

			if (!fullFile) {
				const fullFiles: string[] | null = await listDir(FullDirectory);
				if (!fullFiles) {
					res
						.status(500)
						.send({ message: "The assets/full directory does not exist." });
					return;
				}
				let sourceFile: string | null = null;
				for (const file of fullFiles) {
					if (file.includes(name)) {
						sourceFile = file;
						break;
					}
				}
				if (!sourceFile) {
					res.status(404).send({
						message: `The file: '${fileName}' does not exist in the assets/full path in any format, please upload one by visiting http://localhost:3000`,
					});
					return;
				}

				fullFile = await openFile(`${FullDirectory}/${sourceFile}`);

				if (!fullFile) {
					res
						.status(500)
						.send({ message: `Failed to find ${FullDirectory}/${sourceFile}` });
					return;
				}
				const fileBuffer: Buffer = await fullFile.readFile();
				await sharpUtility.init(fileBuffer);
				try {
					console.log(`[INFO] Converting the file to ${fileType}`);
					await sharpUtility.convert(fileType);
				} catch (err) {
					console.warn(err);
					res.status(400).send({
						message:
							"Invalid file type provided, Expected one of: heic, heif, avif, jpeg, jpg, jpe, tile, dz, png, raw, tiff, tif, webp, gif, jp2, jpx, j2k, j2c, jxl",
					});
					return;
				}
			} else {
				const fileBuffer: Buffer = await fullFile.readFile();
				await sharpUtility.init(fileBuffer);
			}
			await fullFile.close();
			console.log(`[INFO] Resizing new file to ${width} x ${height}`);
			try {
				await sharpUtility.resize(width, height, fit);
			} catch (err) {
				console.warn(err);
				res.status(400).send({
					message:
						"Invalid fit parameter provided type provided, it must be contain, cover, fill, inside or outside",
				});
				return;
			}

			const resizedImage: Buffer = await sharpUtility.toBuffer();
			await writeFile(thumbFileName, resizedImage);
		}
		await thumbFile?.close();
		const imagePath: string = path.join(__dirname, `../../../${thumbFileName}`);
		res.status(200).sendFile(imagePath);
	}

	/**
	 * Lists the files for the specified directory e.g.:
	 * /api/images/full
	 * If the directory does not exist, it returns a 404
	 * @param req
	 * @param res
	 */
	public async list(req: Request, res: Response) {
		const requestDir = req.params.dir;
		if (!requestDir) {
			res.status(400).send({ message: "Please provide a dir" });
			return;
		}
		const dir = await listDir(`assets/${requestDir}`);
		if (!dir) {
			res.status(404).send({ message: "Directory not found" });
			return;
		}
		res.status(200).json(dir);
	}

	/**
	 * Writes a new image to disk based.
	 * The body of the request should include the following:
	 * {
	 *     fileName: string,
	 *     data: base-64 encoded image data
	 * }
	 * @param req
	 * @param res
	 */
	public async createImage(req: Request, res: Response) {
		if (!req.body) {
			res.status(400).send({ message: "Body is required" });
			return;
		}
		if (!req.body.fileName || !req.body.data) {
			res
				.status(400)
				.send({ message: "Make sure you have set data and filename" });
			return;
		}
		const uploadedImage = req.body as UploadImageProps;
		const fullFileName = `${FullDirectory}/${uploadedImage.fileName}`;
		const buffer = Buffer.from(uploadedImage.data, "base64");
		await writeFile(fullFileName, buffer);
		res.status(200).send();
	}
}
