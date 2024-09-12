import { Router } from "express";
import ImageController from "./image";

export default class ApiRouter {
	public router: Router;

	private imageController: ImageController;

	constructor() {
		this.imageController = new ImageController();
		this.router = Router();
		this.router.use("/api", this.imageController.router);
	}
}
