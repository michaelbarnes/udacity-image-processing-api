import supertest from "supertest";
import Server from "../../Server";

const server: Server = new Server({
	port: 3002,
	createDirs: true,
	logging: false,
});

// Adding this because I cant figure out why the IDE linting is not working
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const request = supertest(server.app);

describe("test the Landing Page", () => {
	it("it should respond with 200", async () => {
		const response = await request.get("/");
		expect(response.status).toEqual(200);
	});
});
