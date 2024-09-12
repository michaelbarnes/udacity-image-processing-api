import sharp from "sharp";

export type ResizeOptions = {
	fileDirectory: string;
	width: number;
	height: number;
};

export default class SharpUtility {
	public InputDirectory: string = "./assets/full";
	public ThumbDirectory: string = "./assets/thumb";

	public resize(options: ResizeOptions) {
		return sharp(options.fileDirectory).resize(options.width, options.height);
	}
}
