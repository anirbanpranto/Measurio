import { Measurer } from "./Measurer/Measurer";

const main = async () => {
    const payload = {
        timelimit : 2000,
        case : {"bobo" : "baba"},
        test : {1200 : 23434, 340 : 4520},
        headers : {
            "Content-type" : "application/json"
        }
    }
    const measurer = new Measurer("http://localhost:3000/users/", "GET");
    const result = await measurer.testcase(payload);
    console.log(result);
}

main();

