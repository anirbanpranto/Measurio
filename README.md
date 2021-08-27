# Measurio
A node module for testing your api performance and correctness. Built for a competition platform that my friends and I are working on.

## How to run
* NPM
```
npm i measurio
```
### Example usage
```js
    import { Measurer } from 'measurio'

    const payload = {
        timelimit : 2000,
        case : {"1" : "string", "2" : "spoderman"}, //input
        test : {"1" : "gnirts", "2" : "namredops"}, //expected output
        headers : {
            "Content-type" : "application/json"
        }
    }
    const url = "http://localhost:3000/someEndPoint"
    const method = "GET"
    const measurer = new Measurer(url, method);
    const result = await measurer.testcase(payload);
```

### Example Responses
* Time Limit Exceeded :
```js
{
  code: 2048,
  time: 322.89119999855757,
  message: 'Time limit exceeded, try for a faster solution',
  data: 'ERROR'
}
```
* Wrong Answer :
```js
{
  code: 1024,
  time: 1952.6152000017464,
  message: 'Length of test and length of received object does not match'
}
{
  code: 1024,
  time: 1931.2461000010371,
  message: 'Results differ',
  expected: '1 : ssdfsf',
  received: '1 : undefined'
}
{
  code: 1024,
  time: 1932.8013000003994,
  message: 'Results differ',
  expected: '1 : gnirts',
  received: '1 : ssdfsf'
}
```
* Other error
```js
{
  code: 2048,
  time: 30.61309999972582,
  message: 'Please check your code for errors.',
  data: 'ERROR'
}
```
* Accepted Answer :
```js
{ 
  code: 4096, 
  time: 1953.9976000003517, 
  message: 'Test Passed!' 
}
```