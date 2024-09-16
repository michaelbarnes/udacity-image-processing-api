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
		console.log("Server Config:", this.options);
		this.app.set("port", this.options.port);
		this.app.use(cors());
		this.app.use(
			express.json({
				limit: "50mb",
			}),
		);
		this.app.use(logger);
		this.app.use(this.controllers.router);
	}

	public async start(): Promise<void> {
		if (this.options.createDirs) {
			await this.configureServer();
		}
		this.app.listen(this.app.get("port"), () => {
			console.log(
				`Server started and listening visit http://localhost:${this.options.port}`,
			);
		});
	}

	/**
	 * Setup all of the folders required for the app to function
	 * @private
	 */
	private async configureServer(): Promise<void> {
		const assetsDir = "assets";
		const fullDir = `${assetsDir}/full`;
		const thumbDir = `${assetsDir}/thumb`;

		console.log("Checking if the full and thumb folders are present");
		const dir = await dirExists(assetsDir);
		if (!dir) {
			console.log("Checking if the full and thumb directories being created");
			await createDir(fullDir);
			await createDir(thumbDir);
		}
		const sampleFileName = `${fullDir}/sample.png`;
		const sampleExists = await openFile(sampleFileName);
		if (!sampleExists) {
			console.log("Creating sample image");
			const buffer = Buffer.from(sampleImageData, "base64");
			await writeFile(sampleFileName, buffer);
		}
		sampleExists?.close();
		console.log("Server configured");
	}
}

// Initialize and start the server
(async () => {
	const server = new Server({
		port: 3000,
		createDirs: true,
	});
	await server.start();
})();
