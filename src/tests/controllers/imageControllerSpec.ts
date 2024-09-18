import supertest from "supertest";
import Server from "../../Server";

const server: Server = new Server({
	port: 3001,
	createDirs: true,
	logging: false,
});
// Adding the ts-ignore below because the types for supertest are wrong from what I can tell.
// @ts-ignore
const request = supertest(server.app);

describe("test the ImageController", () => {
	beforeAll(async () => {
		await server.configureServer();
	});

	it("It should respond 404", async () => {
		const response = await request.get(
			"/api/images?filename=abc&width=200&height=200",
		);
		expect(response.status).toEqual(404);
	});

	it("It should respond 400 because width and height are missing", async () => {
		const response = await request.get("/api/images?filename=blah");
		expect(response.status).toEqual(400);
	});

	it("It should respond 400 because width or height not numbers", async () => {
		const response = await request.get(
			"/api/images?filename=blah&width=test&height=test",
		);
		expect(response.status).toEqual(400);
	});

	it("It should respond 200", async () => {
		const response = await request.get(
			"/api/images?filename=fjord&width=200&height=200",
		);
		expect(response.status).toEqual(200);
	});

	it("It should respond 200 and convert", async () => {
		const response = await request.get(
			"/api/images?filename=fjord.png&width=200&height=200",
		);
		expect(response.status).toEqual(200);
	});

	it("It should respond 200 and fit", async () => {
		const response = await request.get(
			"/api/images?filename=fjord&width=200&height=200&fit=inside",
		);
		expect(response.status).toEqual(200);
	});

	it("It should respond 400 due to invalid fit", async () => {
		const response = await request.get(
			"/api/images?filename=fjord&width=200&height=200&fit=none",
		);
		expect(response.status).toEqual(400);
	});

	it("It should respond 400 due to invalid file type", async () => {
		const response = await request.get(
			"/api/images?filename=fjord.pdf&width=200&height=200",
		);
		expect(response.status).toEqual(400);
	});

	it("It should return 200 on full list", async () => {
		const response = await request.get("/api/images/list/full");
		expect(response.status).toEqual(200);
	});

	it("It should return 404 on lists", async () => {
		const response = await request.get("/api/images/list/test");
		expect(response.status).toEqual(404);
	});
});
