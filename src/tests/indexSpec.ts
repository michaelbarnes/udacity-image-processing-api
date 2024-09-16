import Server from "../index";

describe("tests server", () => {
	it("should start the server", () => {
		const server = new Server({
			port: 4000,
			createDirs: false,
		});
		server.start();
	});
});
