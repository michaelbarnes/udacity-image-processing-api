import path from "path";
import { FileHandle } from "fs/promises";
import { Router, Request, Response } from "express";
import { openFile, writeFile, listDir } from "../../utilities/fileUtility";
import { resizeImage } from "../../utilities/sharpUtility";

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

		// First we make sure the query parameters provided are present
		if (!fileName || !width || !height) {
			res.status(400).json({
				message: `Invalid query params specified, please provide filename, width and height. Also, make sure width and height are numbers and not text strings`,
			});
			return;
		}

		const thumbFileName: string = `${ThumbDirectory}/${fileName}_${width}_${height}.png`;
		const fullFileName: string = `${FullDirectory}/${fileName}.png`;

		// Next, try and get the supplied thumb by size
		let thumbFile: FileHandle | null = await openFile(thumbFileName);

		if (!thumbFile) {
			const fullFile: FileHandle | null = await openFile(fullFileName);
			if (!fullFile) {
				// Return 404, the supplied filename does not exist in the directory
				res.status(404).send();
				return;
			}

			const fileBuffer: Buffer = await fullFile.readFile();
			await fullFile.close();

			const resizedImage: Buffer = await resizeImage(fileBuffer, width, height);

			await writeFile(thumbFileName, resizedImage);
		}
		await thumbFile?.close();
		const imagePath: string = path.join(__dirname, `../../../${thumbFileName}`);
		res.status(200).sendFile(imagePath);
	}

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
