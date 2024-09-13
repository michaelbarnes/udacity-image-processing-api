import supertest from "supertest";
import Server from "../../";

const server: Server = new Server();
// Adding the ts-ignore below because the types for supertest are wrong from what I can tell.
// @ts-ignore
const request = supertest(server.app);

describe("test the ImageController", () => {
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
			"/api/images?filename=sample&width=200&height=200",
		);
		expect(response.status).toEqual(200);
	});
});
