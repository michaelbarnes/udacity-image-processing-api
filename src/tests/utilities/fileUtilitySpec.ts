import { openFile, writeFile, deleteFile } from "../../utilities/FileUtility";

describe("tests functions from FileUtility", () => {
	const testFileDir = "assets/test/test.text";

	it("it should the sample png file that exists already", async () => {
		expect(await openFile("assets/full/sample.png")).toBeTruthy();
	});

	it("it should should be null because the file does not exist", async () => {
		expect(await openFile("assets/full/random.png")).toBeNull();
	});

	it("it should write a sample file to the file system", async () => {
		await writeFile(testFileDir, "Test data");
		expect(await openFile(testFileDir)).toBeTruthy();
	});

	it("it should delete a sample file", async () => {
		await deleteFile(testFileDir);
		expect(await openFile(testFileDir)).toBeNull();
	});
});
