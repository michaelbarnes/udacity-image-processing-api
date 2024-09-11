import { server } from "../";
import {describe} from "node:test";

describe('', () => {
    it('should log app', () => {
        expect(server()).toEqual("Hi");
    });
})
