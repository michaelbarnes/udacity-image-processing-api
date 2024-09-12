import { promises as fs } from "fs";
import { FileHandle } from "fs/promises";

/**
 * Tries to open a file in the assets/full directory using the "r" flag, if the file does not exist, it returns null.
 * @param fileName
 */
export const openFile = async (
	fileName: string,
): Promise<FileHandle | null> => {
	try {
		return await fs.open(fileName, "r");
	} catch (err) {
		return null;
	}
};

/**
 * Writes a file to the file system even if it does not exist yet, and overrides if it exists
 * @param fileName
 * @param data
 */
export const writeFile = async (
	fileName: string,
	data: string,
): Promise<void> => {
	return await fs.writeFile(fileName, data);
};

export const deleteFile = async (fileName: string) => {
	await fs.rm(fileName);
};
