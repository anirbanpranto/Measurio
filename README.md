# Measurio
A node module for testing your api performance and correctness. Built for a competition platform that me and my friends are working on.

## How to run
* Clone repo first!
* Then run :
```
yarn
```
### Example usage
```js
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
```

### Example Responses
```js
{
  code: 2048,
  time: 322.89119999855757,
  message: 'Time limit exceeded, try for a faster solution',
  data: 'ERROR'
}
```