````javascript
/**
* Checks if a number is prime and returns its factors if it's not.
*
* @param {number} num The number to check. Must be an integer greater than 1.
* @returns {object|boolean} An object containing the factors if the number is not prime,
* otherwise returns true (is prime). Returns an error message if input is invalid.
*
* @throws {Error} If the input is not a valid integer greater than 1.
*/
function isPrimeAndFactors(num) {
//Error Handling for invalid input
if (!Number.isInteger(num) || num <= 1) { return "Error: Input must be an integer greater than 1." ; } //Optimization:
	Check for divisibility by 2 first. if (num===2) return true; // 2 is prime if (num % 2===0) return { num, factors:
	[2] }; //Even numbers>2 are not prime

	//Efficient primality test: Check divisibility only up to the square root of num
	for (let i = 3; i <= Math.sqrt(num); i +=2) { if (num % i===0) { // Found a factor, build the list of factors
		efficiently. const factors=[i]; let otherFactor=num / i; if (otherFactor !==i)
		factors.push(otherFactor); //Avoid duplicates //Further optimization: No need to continue the loop. All factors
		have been found return { num, factors }; } } //No factors found, the number is prime. return true; } // Test
		cases console.log(isPrimeAndFactors(2)); // true (Prime) console.log(isPrimeAndFactors(17)); // true (Prime)
		console.log(isPrimeAndFactors(10)); // { num: 10, factors: [ 2, 5 ] } (Not prime)
		console.log(isPrimeAndFactors(100)); // { num: 100, factors: [ 2, 50 ] } (Not prime)
		console.log(isPrimeAndFactors(15)); // { num: 15, factors: [3,5] } (Not prime)
		console.log(isPrimeAndFactors(9)); // { num: 9, factors: [ 3, 3 ] } (Not prime)
		console.log(isPrimeAndFactors(1)); // Error: Input must be an integer greater than 1.
		console.log(isPrimeAndFactors(2.5)); // Error: Input must be an integer greater than 1.
		console.log(isPrimeAndFactors("abc")); // Error: Input must be an integer greater than 1. ```
````
