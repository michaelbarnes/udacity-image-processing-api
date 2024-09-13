import sharp, { FitEnum } from "sharp";

export type ResizeOptions = {
	file: string | Buffer;
	width: number;
	height: number;
};

export const resizeImage = (options: ResizeOptions) => {
	return sharp(options.file).resize(options.width, options.height).toBuffer();
};
