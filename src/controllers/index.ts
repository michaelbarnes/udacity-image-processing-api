import path from "path";
import { Router, Response, Request } from "express";
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

	/**
	 * Fetches the landing page when the route path is opened in the browser
	 * @param req
	 * @param res
	 * @private
	 */
	private async landingPageController(req: Request, res: Response): Promise<void> {
		res.status(200).sendFile(path.join(__dirname, "../../public/index.html"));
	}
}
