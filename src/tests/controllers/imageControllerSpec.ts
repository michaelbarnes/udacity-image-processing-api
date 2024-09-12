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

	it("It should respond 400", async () => {
		const response = await request.get("/api/images?filename=blah");
		expect(response.status).toEqual(400);
	});
});
