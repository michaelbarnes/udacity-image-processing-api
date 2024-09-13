import { openFile } from "../utilities/FileUtility";

export default class ImageService {
	public async getFile(fileName: string | null): Promise<void | null> {
		const file = await openFile(`assets/full/${fileName}`);
		if (!file) {
			return null;
		}
	}
}
