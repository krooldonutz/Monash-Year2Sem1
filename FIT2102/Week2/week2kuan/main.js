// Surname     | Firstname      | email                      | Contribution% | Any issues?
// ==================================================================================
// Lok         | You ke         |ylok0004@student.monash.edu | 20%           |
// Kuan        | Jun Qiang      |jkua0004@student.monash.edu | 20%           |
// Chong       | Jin yang       |jcho0134@student.monash.edu | 20%           |
// Malcolm     | Sayyidina      |smal0039@student.monash.edu | 20%           |
// Parsanda    | Gde Putu Guido |gdep0001@student.monash.edu | 20%           |
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
const myObj = {
        aProperty: "String",
        anotherProperty : 123

}


/**
 * Exercise 2
 */
function operationOnTwoNumbers(f){
        return x => y => f(x,y)
}


/**
 * Exercise 3m
 */
function callEach(x){
    x.forEach(func => {
        func();
    })
}
/**
 * Exercise 4
 */
function addN(n, array){
    return array.map(element => element +=n)
}

function getEvens(array){
    return array.filter(element => element%2 === 0)
}

function multiplyArray(array){
    const array1 = array.filter(element => element !== 0);
    return array1.reduce((sum,current) => sum * current,1);
}
/**
 * Exercise 5
 */
 function range(n){
    if (n === 0){
      return []
    }else{
      return range(n-1).concat([n-1])
    }
  }
/**
 * Exercise 6
 */
function Euler1(){
    return range(1000).filter(num => (num%3 === 0 || num%5 === 0)).reduce((sum,current) => sum + current,0)
}

/**
 * Exercise 7
 */

const infinite_series_calculator = accumulate=> predicate=> transform=> n => range(n).map(transform).filter(predicate).reduce(accumulate)

/**
 * Exercise 8
 */

function calculatePiTerm(n){
  return (4*n**2)/(4*n**2-1)
}

const skipZero = n => (n!=0 ? true : false)

const productAccumulate = (x, y) => x*y

const calculatePi = n => 2*infinite_series_calculator(productAccumulate)(skipZero)(calculatePiTerm)(n)

const pi = calculatePi(100)
/**
 * Exercise 9
 */

 const factorial = n => n ? n*factorial(n-1) : 1

 const calculateETerm = n => 2*(n+1)/factorial(2*n+1)
 
 const sumAccumulate = (x,y) => x+y
 
 const alwaysTrue = x => true
 
 const sum_series_calculator = transform => n => infinite_series_calculator(sumAccumulate)(alwaysTrue)(transform)(n)
 
 const calculateE = n =>  sum_series_calculator(calculateETerm)(n)
 
 const e = calculateE(3)

/**
 * Exercise 10
 */
 const calculateSinTerm = x => n => (((-1)**n)*((x)**((2*n)+1)))/(factorial(2*n+1));

 const sin_calculator = x => n => infinite_series_calculator(sumAccumulate)(alwaysTrue)(calculateSinTerm(x))(n);
 
 const sin = x => sin_calculator(x)(4)