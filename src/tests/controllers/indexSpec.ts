import supertest from "supertest";
import Server from "../../";

const server: Server = new Server();
// Adding the ts-ignore below because the types for supertest are wrong from what I can tell.
// @ts-ignore
const request = supertest(server.app);

describe("test the Landing Page", () => {
	it("It should respond with 200", async () => {
		const response = await request.get("/");
		expect(response.status).toEqual(200);
	});
});
