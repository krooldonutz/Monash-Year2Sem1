// Surname     | Firstname | Contribution % | Any issues?
// =====================================================
// Person 1... |           | 25%
// Person 2... |           | 25%
// Person 3... |           | 25%
// Person 4... |           | 25%
//
// complete Worksheet 2 by entering code in the places marked below...
//
// For full instructions and tests open the file worksheetChecklist.html
// in Chrome browser.  Keep it open side-by-side with your editor window.
// You will edit this file (main.js), save it, and reload the
// browser window to run the test.

/**
 * Exercise 1
 */

const myObj = {}
myObj.aProperty = "Hello World"
myObj.anotherProperty = 69

/**
 * Exercise 2
 */
 function operationOnTwoNumbers(x, y){
    return x + y
}
/**
 * Exercise 3
 */
function callEach (arr){
    arr.forEach(element => {
        element()
    });
}
/**
 * Exercise 4
 */
function addN(n, arr){
    let ret = arr.map(element => n + element)
    return ret
}
    


function getEvens(arr){
    let ret = arr.filter(elements => elements%2 == 0)
    return ret
}

function multiplyArray(arr){
    let ret = 1
    arr.forEach(element => {
        if (element != 0){
            ret *= element
        }
    })
    return ret
}
/**
 * Exercise 5
 */
function range(n, arr = [], i = 0){
    if (i == n){
        return arr
    }
    let temp = arr.concat([i])
    i += 1
    return range(n, temp, i)
}
/**
 * Exercise 6
 */
function Euler1(){
    let arr = range(1000)
    let arr2 = arr.filter(element => element%3 == 0 || element%5 == 0)
    let sum = arr2.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
    });
    return sum
}
/**
 * Exercise 7
 */
const infinite_series_calculator = accumulate => predicate => transform => n => range(n).map(transform).filter(predicate).reduce(accumulate)
/**
 * Exercise 8
 */
function calculatePiTerm(n){
    return  4*(n**2) / (4*(n**2) -1)
}

function skipZero(n){
    if (n != 0){
        return true
    }
    else {return false}
}

function productAccumulate(f, n){
    return f*n
}

function calculatePi(n){
    return 2 * infinite_series_calculator(productAccumulate)(skipZero)(calculatePiTerm)(n)
}

const pi = calculatePi(100)
/**
 * Exercise 9
 */

 function factorial(x) {
    return x == 0 ? 1 : x * factorial(x-1)
}

function calculateETerm(n){
    return 2 * (n+1) / factorial(2*n +1)
}

function sumAccumulate(x, y){
    return x+y
}

function alwaysTrue(n){
    return true
}

function sum_series_calculator(transform){
    return function(n){
        return infinite_series_calculator(sumAccumulate)(alwaysTrue)(transform)(n)
    }
}

function calculateE(n){
    return sum_series_calculator(calculateETerm)(n)
}
/**
 * Exercise 10
 */

const calculateSinTerm = x => n => (((-1)**n)*((x)**((2*n)+1)))/(factorial(2*n+1));

 const sin_calculator = x => n => infinite_series_calculator(sumAccumulate)(alwaysTrue)(calculateSinTerm(x))(n);
 
 const sin = x => sin_calculator(x)(4)