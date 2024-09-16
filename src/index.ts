import Server from "./Server";

// Initialize and invoke the server
(async () => {
	const server = new Server({
		port: 3000,
		createDirs: true,
		logging: true,
	});
	await server.start();
})();
