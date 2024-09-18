import SharpUtility from "../../utilities/sharpUtility";
import { openFile } from "../../utilities/fileUtility";
import path from "path";

describe("tests functions from SharpUtility", () => {
	const sharpUtility = new SharpUtility();
	let buffer: Buffer;

	beforeAll(async () => {
		const dir = path.join(__dirname, "../../../assets/full/fjord.jpg");
		const file = await openFile(dir);
		if (file) buffer = await file.readFile();
	});

	it("should resize the image", async () => {
		if (buffer) {
			await sharpUtility.init(buffer);
			await sharpUtility.resize(200, 200, "contain");
			expect(sharpUtility.image).toBeTruthy();
		} else {
			throw new Error("Failed to resize the image");
		}
	});

	it("should serialize to Buffer", async () => {
		if (buffer) {
			await sharpUtility.init(buffer);
			await sharpUtility.resize(200, 200, "contain");
			const resizedImageBuffer = await sharpUtility.toBuffer();
			expect(resizedImageBuffer).toBeTruthy();
		} else {
			throw new Error("Failed to resize the image");
		}
	});

	it("should convert the image", async () => {
		if (buffer) {
			await sharpUtility.init(buffer);
			await sharpUtility.convert("png");
			const resizedImageBuffer = await sharpUtility.toBuffer();
			expect(resizedImageBuffer).toBeTruthy();
		} else {
			throw new Error("Failed to resize the image");
		}
	});
});
