import { Request, Response } from "express";

export const logger = (req: Request, res: Response, next: () => void) => {
	console.log(
		`A new request has been submitted from ${req.ip} to path ${req.path}`,
	);
	next();
};
