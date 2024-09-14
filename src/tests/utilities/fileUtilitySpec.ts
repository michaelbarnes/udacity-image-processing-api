import { promises as fs } from "fs";
import { openFile, writeFile, deleteFile } from "../../utilities/fileUtility";

describe("tests functions from FileUtility", () => {
	const testingDir = "assets/test";
	const testingFileName = "test.txt";
	const testFileDir = `${testingDir}/${testingFileName}`;

	beforeAll(async () => {
		try {
			await fs.opendir(testingDir);
		} catch (err) {
			await fs.mkdir(testingDir);
		}
	});

	afterAll(async () => {
		await fs.rmdir(testingDir);
	});

	it("it should open the sample png file that exists already", async () => {
		const fileHandle = await openFile("assets/full/sample.png");
		fileHandle?.close();
		expect(fileHandle).toBeTruthy();
	});

	it("it should should be null because the file does not exist", async () => {
		const fileHandle = await openFile("assets/full/random.png");
		fileHandle?.close();
		expect(fileHandle).toBeNull();
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
