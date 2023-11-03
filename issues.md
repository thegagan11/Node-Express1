# Broken App Issues

1. Async Handling - the code did not properly handled asynchronous operations. It used 'map' with an 'async' function but didn't use 'Promise.all' to wait for the completition of all promises.

2. Error Handling - error object ('err') was not passed correctly to the 'next' function in the catch block, which could cause issues in error handling.

3. **JSON Body Parsing- the code didn't include middleware to parse the JSON body of the request, which is necessary for Express.js to correctly handle JSON input.

4.Code Readability- The original code lacked proper formatting and comments, making it harder to read and understand.

5. Variable Declarations- Some variables were declared using 'let' where 'const' would have been more appropriate, as these variables were not reassigned.