import express from "express";
import cors from "cors";
import { logger } from "./middleware/logger";
import Controllers from "./controllers";
import {
	dirExists,
	createDir,
	writeFile,
	openFile,
} from "./utilities/fileUtility";
import { sampleImageData } from "./utilities/sampleData";

export type ServerOptions = {
	/**
	 * The port number the server should run on
	 */
	port: number;
	/**
	 * Starts the server and does not create full or thumb
	 * directory if undefined or false
	 */
	createDirs: boolean | undefined;
	/**
	 * Switch logging on of off (true|false)
	 */
	logging: boolean;
};

export default class Server {
	public app: express.Application;
	protected options: ServerOptions;
	private controllers: Controllers = new Controllers();

	constructor(options: ServerOptions) {
		this.options = options;
		this.app = express();
		this.init();
	}

	public init(): void {
		this.app.set("port", this.options.port);
		this.app.use(cors());
		this.app.use(
			express.json({
				limit: "50mb",
			}),
		);
		if (this.options.logging) {
			console.log("Server Config:", this.options);
			this.app.use(logger);
		}
		this.app.use(this.controllers.router);
	}

	public async start(): Promise<void> {
		if (this.options.createDirs) {
			await this.configureServer();
		}
		this.app.listen(this.app.get("port"), () => {
			if (this.options.logging) {
				console.log(
					`Server started and listening visit http://localhost:${this.options.port}`,
				);
			}
		});
	}

	/**
	 * Setup all the directories required for the app to function
	 * @private
	 */
	public async configureServer(): Promise<void> {
		const assetsDir = "assets";
		const thumbDir = `${assetsDir}/thumb`;

		if (this.options.logging) {
			console.log("Checking if the thumb directory exists");
		}
		const dir = await dirExists(thumbDir);
		if (!dir) {
			if (this.options.logging) {
				console.log("Creating thumb directory");
			}
			await createDir(thumbDir);
		}

		if (this.options.logging) {
			console.log("Server configured");
		}
	}
}
