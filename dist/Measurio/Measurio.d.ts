import { Method } from "axios";
export declare class Measurio {
    url: string;
    method: Method;
    buffer: number;
    constructor(url: string, method: Method);
    testcase(payload: {
        timelimit: number;
        case: Object;
        test: Object;
        headers: Object;
    }): Promise<unknown>;
}
