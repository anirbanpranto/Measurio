import axios, { Method } from 'axios'
import { performance } from 'perf_hooks';

const FAILED_CASE = 1024;
const TIME_LIMIT = 2048;
const PASSED_CASE = 4096;

export class Measurer{
    url : string; //URL to send payload to
    method : Method; //GET, POST, PUT, PATCH
    buffer : number
    constructor(url : string, method : Method){
        this.url = url;
        this.method = method;
        this.buffer = 200;
    }

    async testcase(payload : {timelimit : number, case : Object, test : Object, headers : Object}){
        const start = performance.now();
        const tl = payload.timelimit + this.buffer;
        const options = {
            url : this.url,
            timeout : tl,
            method : this.method,
            headers : payload.headers,
            data : payload.case
        }
        
        const ans = await axios(options).catch(err=>{
            return {
                code : TIME_LIMIT,
                time : performance.now() - start,
                message : performance.now() - start > tl ? "Time limit exceeded, try for a faster solution" : "Please check your code for errors",
                data : "ERROR"
            };
        });
        const testing = () => {
            return new Promise(async (resolve, reject)=>{
                const keys = Object.keys(payload.test);
                const passed = [];
                if(ans.data === "ERROR"){
                    resolve(ans);
                    return;
                }
                if(keys.length != Object.keys(ans.data).length){
                    resolve({
                        code : FAILED_CASE,
                        time : performance.now() - start,
                        message : "Length of test and length of received object does not match",
                    });
                    return;
                }
                for(let i = 0; i < keys.length; i++){
                    if(payload.test[keys[i]] === ans.data[keys[i]] && ans.data[keys[i]] && payload.test[keys[i]] && ans){
                        passed.push(i);
                        if(i === keys.length - 1 && passed.length === keys.length){
                            resolve({
                                code : PASSED_CASE,
                                time : performance.now() - start,
                                message : "Test Passed!"
                            });
                            return;
                        }
                    }
                    else{
                        resolve({
                            code : FAILED_CASE,
                            time : performance.now() - start,
                            message : "Results differ",
                            expected : keys[i] + " : " +payload.test[keys[i]],
                            received : keys[i] + " : " + ans.data[keys[i]] 
                        });
                        return;
                    }
                }
            });
        }
        return await testing();
    }
};