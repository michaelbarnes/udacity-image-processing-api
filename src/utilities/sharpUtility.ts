import sharp, { FitEnum, FormatEnum, Sharp } from "sharp";

export default class SharpUtility {
	public image: Sharp | null;

	constructor() {
		this.image = null;
	}

	public async init(file: string | Buffer) {
		this.image = await sharp(file);
	}

	public async resize(width: number, height: number, fit: string) {
		if (!this.isFitEnum(fit)) {
			throw new Error(
				"fit must be one of contain, cover, fill, inside or outside",
			);
		}
		if (!this.image) {
			throw new Error(
				"image property is null or undefined, please run init first.",
			);
		}

		this.image = await this.image.resize(width, height, {
			fit: fit as keyof FitEnum,
		});
	}

	public async convert(format: string) {
		if (!this.image) {
			throw new Error("image property is null or undefined, first run init()");
		}
		this.image = this.image.toFormat(format as keyof FormatEnum);
	}

	public async toBuffer() {
		if (!this.image) {
			throw new Error("image property is null or undefined, first run init()");
		}
		return await this.image.toBuffer();
	}

	private isFitEnum(fit: string) {
		const types = ["contain", "cover", "fill", "inside", "outside"];
		return types.indexOf(fit) > -1;
	}
}
