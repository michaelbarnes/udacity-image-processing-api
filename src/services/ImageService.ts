import SharpUtility from "../utilities/SharpUtility";
import { openFile } from "../utilities/FileUtility";

export default class ImageService {
	private sharpClient: SharpUtility;

	constructor() {
		this.sharpClient = new SharpUtility();
	}

	public async getImage(fileName: string): Promise<void | null> {
		const file = await openFile(`assets/full/${fileName}`);
		if (!file) {
			return null;
		}

		console.log("Image Service");
	}
}
