import { promises as fs, readFile } from "fs";
import { FileHandle } from "fs/promises";

/**
 * Tries to open a file in the assets/full directory using the "r" flag, if the file does not exist
 * an error is thrown (ENOTFOUND) and return null.
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
	data: string | Buffer,
): Promise<void> => {
	return await fs.writeFile(fileName, data);
};

/**
 * Delete a file with for the provided directory/file
 * @param fileName
 */
export const deleteFile = async (fileName: string): Promise<void> => {
	await fs.rm(fileName);
};

export const readData = async (fileName: string) => {
	await fs.readFile(fileName, { encoding: "base64" });
};
