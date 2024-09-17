import SharpUtility from "../../utilities/sharpUtility";
import { sampleImageData } from "../../utilities/sampleData";

describe("tests functions from SharpUtility", () => {
	const sharpUtility = new SharpUtility();
	let buffer: Buffer | null = null;

	beforeAll(() => {
		buffer = Buffer.from(sampleImageData, "base64");
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
			const resizedImageBuffer = await sharpUtility.serialize();
			expect(resizedImageBuffer).toBeTruthy();
		} else {
			throw new Error("Failed to resize the image");
		}
	});

	it("should convert the image", async () => {
		if (buffer) {
			await sharpUtility.init(buffer);
			await sharpUtility.convert("png");
			const resizedImageBuffer = await sharpUtility.serialize();
			expect(resizedImageBuffer).toBeTruthy();
		} else {
			throw new Error("Failed to resize the image");
		}
	});

	it("should convert image to JPG", async () => {});
});
