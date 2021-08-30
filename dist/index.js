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
//export { Measurer } from "./Measurer/Measurer";
const Measurio_1 = require("./Measurer/Measurio");
const url = "http://localhost:3000/users";
const method = "GET";
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const measure = new Measurio_1.Measurio(url, method);
    const payload = {
        timelimit: 2000,
        case: { 1: "string", 2: "bumblebee" },
        test: { 1: 6, 2: 9 },
        headers: {
            "Content-type": "application/json"
        }
    };
    const ans = yield measure.testcase(payload);
    console.log(ans);
});
main();
