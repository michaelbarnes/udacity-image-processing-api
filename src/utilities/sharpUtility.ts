import sharp from "sharp";

export const resizeImage = (
	file: string | Buffer,
	width: number,
	height: number,
) => {
	return sharp(file).resize(width, height, { fit: "contain" }).toBuffer();
};
