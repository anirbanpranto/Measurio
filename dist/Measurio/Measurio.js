"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const perf_hooks_1 = require("perf_hooks");
const FAILED_CASE = 1024;
const TIME_LIMIT = 2048;
const PASSED_CASE = 4096;
class Measurio {
    constructor(url, method) {
        this.url = url;
        this.method = method;
        this.buffer = 200;
    }
    testcase(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Here");
            const start = perf_hooks_1.performance.now();
            const tl = payload.timelimit + this.buffer;
            const options = {
                url: this.url,
                timeout: tl,
                method: this.method,
                headers: payload.headers,
                data: payload.case,
            };
            const ans = yield axios_1.default(options).catch((err) => {
                return {
                    code: TIME_LIMIT,
                    time: perf_hooks_1.performance.now() - start,
                    message: perf_hooks_1.performance.now() - start > tl
                        ? "Time limit exceeded, try for a faster solution"
                        : "Please check your code for errors",
                    data: "ERROR",
                };
            });
            const testing = () => {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    const keys = Object.keys(payload.test);
                    const passed = [];
                    // error occured/timeout - return
                    if (ans.data === "ERROR") {
                        resolve(ans);
                        return;
                    }
                    // input and output are not same - wrong answer - return
                    if (keys.length != Object.keys(ans.data).length) {
                        resolve({
                            code: FAILED_CASE,
                            time: perf_hooks_1.performance.now() - start,
                            message: "Length of test and length of received object does not match",
                        });
                        return;
                    }
                    //just comparing the strings is enough
                    if (JSON.stringify(ans.data) === JSON.stringify(payload.test)) {
                        resolve({
                            code: PASSED_CASE,
                            time: perf_hooks_1.performance.now() - start,
                            message: "Test Passed!",
                        });
                        return;
                    }
                    //for looking for where it went wrong
                    for (let i = 0; i < keys.length; i++) {
                        const type = typeof payload.test[keys[i]];
                        switch (type) {
                            case "bigint":
                            case "boolean":
                            case "number":
                            case "string":
                                if (!(payload.test[keys[i]] === ans.data[keys[i]] &&
                                    ans.data[keys[i]] &&
                                    payload.test[keys[i]] &&
                                    ans)) {
                                    resolve({
                                        code: FAILED_CASE,
                                        time: perf_hooks_1.performance.now() - start,
                                        message: "Results differ",
                                        expected: keys[i] + " : " + payload.test[keys[i]],
                                        received: keys[i] + " : " + ans.data[keys[i]],
                                    });
                                    return;
                                }
                                break;
                            case "object":
                                if (!(typeof payload.test[keys[i]] === typeof ans.data[keys[i]]) ||
                                    JSON.stringify(payload.test[keys[i]]) !==
                                        JSON.stringify(ans.data[keys[i]])) {
                                    resolve({
                                        code: FAILED_CASE,
                                        time: perf_hooks_1.performance.now() - start,
                                        message: "Results differ",
                                        expected: keys[i] + " : " + payload.test[keys[i]],
                                        received: keys[i] + " : " + ans.data[keys[i]],
                                    });
                                    return;
                                }
                                break;
                        }
                    }
                }));
            };
            return yield testing();
        });
    }
}
exports.Measurio = Measurio;
