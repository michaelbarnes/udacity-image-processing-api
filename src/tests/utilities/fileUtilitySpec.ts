import { promises as fs } from "fs";
import {
	openFile,
	writeFile,
	deleteFile,
	listDir,
} from "../../utilities/fileUtility";
import { FileHandle } from "fs/promises";

describe("tests functions from FileUtility", () => {
	const testingDir = "assets/test";
	const testingFileName = "test.txt";
	const testFileDir = `${testingDir}/${testingFileName}`;

	let fileHandle: FileHandle | null;

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

	afterEach(async () => {
		if (fileHandle) {
			await fileHandle.close();
		}
	});

	it("it should open the sample png file that exists already", async () => {
		const fileHandle = await openFile("assets/full/sample.png");
		expect(fileHandle).toBeTruthy();
	});

	it("it should should be null because the file does not exist", async () => {
		fileHandle = await openFile("assets/full/random.png");
		expect(fileHandle).toBeNull();
	});

	it("it should write a sample file to the file system", async () => {
		await writeFile(testFileDir, "Test data");
		fileHandle = await openFile(testFileDir);
		expect(fileHandle).toBeTruthy();
	});

	it("it should list content of dir", async () => {
		const dirContent = await listDir(testingDir);
		expect(dirContent?.length).toEqual(1);
	});

	it("it should delete a sample file", async () => {
		await deleteFile(testFileDir);
		fileHandle = await openFile(testFileDir);
		expect(fileHandle).toBeNull();
	});
});
