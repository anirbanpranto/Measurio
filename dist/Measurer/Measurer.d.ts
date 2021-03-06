import { Method } from "axios";
export declare class Measurer {
    url: string;
    method: Method;
    buffer: number;
    types: string;
    constructor(url: string, method: Method, types: string);
    testcase(payload: {
        timelimit: number;
        case: Object;
        test: Object;
        headers: Object;
    }): Promise<unknown>;
}
