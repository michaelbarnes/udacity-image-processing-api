import express from "express";
import { logger } from "./middleware/logger";
import ApiRouter from "./routes";

const Port = 3000;

class Server {
	private app: express.Application;
	private apiRouter = new ApiRouter();

	constructor() {
		this.app = express();
		this.init();
	}

	public init(): void {
		console.log(
			`Running init to configure application, setting port and loading middleware`,
		);
		this.app.set("port", Port);
		this.app.use(logger);
		this.app.use(this.apiRouter.router);
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
