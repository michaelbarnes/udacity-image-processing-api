import path from "path";
import { Router, Request, Response } from "express";
import ImageController from "./image";

/**
 * Base controller of the API. Additional controllers for new API versions
 * should be added here.
 * e.g. this.router.use("/new-controller", this.newController.router)
 */
export default class Controllers {
	public router: Router;

	private imageController: ImageController = new ImageController();

	constructor() {
		this.router = Router();
		this.router.use("/api", this.imageController.router);
		this.router.get("/", this.landingPageController);
	}

	private async landingPageController(
		req: Request,
		res: Response,
	): Promise<void> {
		res.status(200).sendFile(path.join(__dirname, "../../public/index.html"));
	}
}
