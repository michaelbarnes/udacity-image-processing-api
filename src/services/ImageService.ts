import SharpUtility from "../utilities/SharpUtility";
import { openFile } from "../utilities/FileUtility";

export default class ImageService {
	private sharpClient: SharpUtility;

	constructor() {
		this.sharpClient = new SharpUtility();
	}

	public async getFile(fileName: string | null): Promise<void | null> {
		const file = await openFile(`assets/full/${fileName}`);
		if (!file) {
			return null;
		}
	}
}
