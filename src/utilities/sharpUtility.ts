import sharp, { AvailableFormatInfo, FormatEnum, Sharp } from "sharp";

export default class SharpUtility {
	public image: Sharp | null;

	constructor() {
		this.image = null;
	}

	public async resize(file: string | Buffer, width: number, height: number) {
		this.image = await sharp(file).resize(width, height, { fit: "contain" });
	}

	public async convert(format: FormatEnum | AvailableFormatInfo) {
		if (!this.image) {
			throw new Error(
				"image property is null or undefined, please resize the image first.",
			);
		}
		//@ts-ignore
		this.image = this.image.toFormat(format);
	}

	public async serialize() {
		if (!this.image) {
			throw new Error(
				"image property is null or undefined, please resize the image first.",
			);
		}
		return await this.image.toBuffer();
	}
}
