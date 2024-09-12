import { Router, Request, Response } from "express";
import ImageService from "../../services/ImageService";
import { openFile } from "../../utilities/FileUtility";

export default class ImageController {
	public router: Router;
	protected imageService: ImageService;

	constructor() {
		this.imageService = new ImageService();
		this.router = Router();
		this.initRoutes();
	}

	private initRoutes() {
		this.router.get("/images", this.getFile);
	}

	private async getFile(req: Request, res: Response) {
		const fileName = req.query.filename ? (req.query.filename as string) : null;
		const width = req.query.width ? (req.query.width as string) : null;
		const height = req.query.height ? (req.query.height as string) : null;

		if (!fileName || !width || !height) {
			res.status(400).json({
				message: `Invalid query params specified, please provide filename, width and height`,
			});
			return;
		}

		const file = await openFile(`assets/full/${fileName}`);
		if (!file) {
			if (!file) {
				res.status(404).send();
				return;
			}
		}
		res.status(200).send("Hi");
	}
}
