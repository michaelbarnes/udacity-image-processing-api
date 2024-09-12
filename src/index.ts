import express from "express";
import { logger } from "./middleware/logger";
import Controllers from "./controllers";

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

	public start(): void {
		this.app.listen(this.app.get("port"), () => {
			console.log(
				`Server started and listening visit http://localhost:${Port}`,
			);
		});
	}
}

const server = new Server();
server.start();
