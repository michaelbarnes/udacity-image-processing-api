import { Router, Request, Response } from "express";
import ImageService from "../../services/ImageService";

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
		const queryParams = req.params;
		if (!queryParams.filename || !queryParams.width || !queryParams.height) {
			res.status(400).json({
				message: `Invalid query params specified, please provide filename, width and height`,
			});
			return;
		}
		const file = await this.imageService.getImage(queryParams.filename);
		if (!file) {
			res.status(404).send();
			return;
		}

		res.status(200).send(file);
	}
}
