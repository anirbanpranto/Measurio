import axios, { Method } from "axios";
import { performance } from "perf_hooks";

const FAILED_CASE = 1024;
const TIME_LIMIT = 2048;
const PASSED_CASE = 4096;

export class Measurio {
  url: string; //URL to send payload to
  method: Method; //GET, POST, PUT, PATCH
  buffer: number;
  constructor(url: string, method: Method) {
    this.url = url;
    this.method = method;
    this.buffer = 200;
  }

  async testcase(payload: {
    timelimit: number;
    case: Object;
    test: Object;
    headers: Object;
  }) {
    console.log("Here");
    const start = performance.now();
    const tl = payload.timelimit + this.buffer;
    const options = {
      url: this.url,
      timeout: tl,
      method: this.method,
      headers: payload.headers,
      data: payload.case,
    };

    const ans = await axios(options).catch((err) => {
      return {
        code: TIME_LIMIT,
        time: performance.now() - start,
        message:
          performance.now() - start > tl
            ? "Time limit exceeded, try for a faster solution"
            : "Please check your code for errors",
        data: "ERROR",
      };
    });
    const testing = () => {
      return new Promise(async (resolve, reject) => {
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
            time: performance.now() - start,
            message:
              "Length of test and length of received object does not match",
          });
          return;
        }

        //just comparing the strings is enough
        if (JSON.stringify(ans.data) === JSON.stringify(payload.test)) {
          resolve({
            code: PASSED_CASE,
            time: performance.now() - start,
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
              if (
                !(
                  payload.test[keys[i]] === ans.data[keys[i]] &&
                  ans.data[keys[i]] &&
                  payload.test[keys[i]] &&
                  ans
                )
              ) {
                resolve({
                  code: FAILED_CASE,
                  time: performance.now() - start,
                  message: "Results differ",
                  expected: keys[i] + " : " + payload.test[keys[i]],
                  received: keys[i] + " : " + ans.data[keys[i]],
                });
                return;
              }
              break;
            case "object":
              if (
                !(typeof payload.test[keys[i]] === typeof ans.data[keys[i]]) ||
                JSON.stringify(payload.test[keys[i]]) !==
                  JSON.stringify(ans.data[keys[i]])
              ) {
                resolve({
                  code: FAILED_CASE,
                  time: performance.now() - start,
                  message: "Results differ",
                  expected: keys[i] + " : " + payload.test[keys[i]],
                  received: keys[i] + " : " + ans.data[keys[i]],
                });
                return;
              }
              break;
          }
        }
      });
    };
    return await testing();
  }
}