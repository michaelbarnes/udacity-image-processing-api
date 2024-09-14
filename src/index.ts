import express from "express";
import { logger } from "./middleware/logger";
import Controllers from "./controllers";
import {
	dirExists,
	createDir,
	writeFile,
	openFile,
} from "./utilities/fileUtility";

const Port = 3000;

export default class Server {
	public app: express.Application;
	private controllers: Controllers = new Controllers();

	constructor() {
		this.app = express();
		this.init();
	}

	public init(): void {
		this.app.set("port", process.env.PORT ? process.env.PORT : Port);
		this.app.use(logger);
		this.app.use(this.controllers.router);
	}

	public async start(): Promise<void> {
		await this.configureServer();
		this.app.listen(this.app.get("port"), () => {
			console.log(
				`Server started and listening visit http://localhost:${Port}`,
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

		const exists = await dirExists(assetsDir);
		if (!exists) {
			await createDir(fullDir);
			await createDir(thumbDir);
		}
		const sampleFileName = `${fullDir}/sample.png`;
		const sampleExists = await openFile(sampleFileName);
		if (!sampleExists) {
			await writeFile(sampleFileName, "Hello world");
		}
		sampleExists?.close();
	}
}

// Initialize and start the server
(async () => {
	const server = new Server();
	await server.start();
})();
