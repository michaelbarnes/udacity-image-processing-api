import path from "path";
import { FileHandle } from "fs/promises";
import { Router, Request, Response } from "express";
import { openFile, writeFile } from "../../utilities/FileUtility";
import { resizeImage } from "../../utilities/SharpUtility";

export default class ImageController {
	public router: Router;

	constructor() {
		this.router = Router();
		this.initRoutes();
	}

	private initRoutes() {
		this.router.get("/images", this.get);
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
		const fullDirectory: string = "assets/full";
		const thumbDirectory: string = "assets/thumb";

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

		const thumbFileName: string = `${thumbDirectory}/${fileName}_${width}_${height}.png`;
		const fullFileName: string = `${fullDirectory}/${fileName}.png`;

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
}
