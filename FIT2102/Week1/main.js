/* 
Complete the following table when you submit this file:

Surname     | Firstname      | email                      | Contribution% | Any issues?
==================================================================================
Lok         | You ke         |ylok0004@student.monash.edu | 20%           |
Kuan        | Jun Qiang      |jkua0004@student.monash.edu | 20%           |
Chong       | Jin yang       |jcho0134@student.monash.edu | 20%           |
Malcolm     | Sayyidina      |smal0039@student.monash.edu | 20%           |
Parsanda    | Gde Putu Guido |gdep0001@student.monash.edu | 20%           |

complete Worksheet 1 by entering code in the places marked below...

For full instructions and tests open the file worksheetChecklist.html
in Chrome browser.  Keep it open side-by-side with your editor window.
You will edit this file (main.js), save it, and reload the 
browser window to run the test. 
*/

/**
    Exercise 1:
    The let and const keywords are for creating mutable and immutable variables 
    respectively.
    Create a mutable variable called ‘aVariable’ and assign its value to 1.
*/
// your first line of code here...
let aVariable = 1

/*
    Create an immutable variable called ‘aConst’ and assign its value to aVariable + 1.
*/
// your second line of code here...
const aConst = aVariable +1

/**
    Exercise 2:
    Create a function called ‘aFunction’ using the function keyword.  
    Inside the function create another variable called 'anotherVariable',
    set its value to 2 and return anotherVariable.
*/
function aFunction(){
    let anotherVariable = 2;

    return anotherVariable
}

/**
    Exercise 3:
    Make a function called ‘projectEulerProblem1’ that calculates the answer using
    mutable variables, a while loop, and returns the answer.
*/
function projectEulerProblem1(){
    let i = 1;      //mutable variable which used for while loop iteration
    let sum = 0;    //mutable variable which used to return result
    while (i<1000) {
        if(i % 3 === 0){        //if i can divided by 3
            sum +=i             //add it to 'sum' variable
        }
        
        else if (i % 5 === 0){  //if i can divided by 5
            sum +=i             //add it to 'sum' variable
        }
        i++                     // iterate i by 1
    }
    return sum                  // return result
}

/**
    Exercise 4:
    Write a function called ‘alwaysTrue’ which always returns true, no matter what argument it is given.
*/
    function alwaysTrue(){
        return true
    }
/**
    Write a function called imperativeSummer that takes two parameters: a function f, and a number n.  
    It should use an imperative loop to sum over the numbers from 1 up to (but not including) n,
    including the number x in the sum only if f(x) is true.
*/
function imperativeSummer(f,n){
    let sum = 0             //mutable variable which used to return result
    let i = 1               //mutable variable which used for while loop iteration
    while (i<n){
        f(i) === true ? sum  += i : sum +=0     //if function(i) return true, sum = sum+i else sum remains sum
        i++                 // iterate i by 1
    }
    return sum              // return result
}
/**
    Write a function called sumTo that takes as parameter a number n and
    uses imperativeSummer and alwaysTrue to calculate the sum of all numbers
    from 1 up to (but not including) n.
*/
function sumTo(n){
    return imperativeSummer(alwaysTrue, n);
}

/**
    Write a function called ‘isDivisibleByThreeOrFive’ which takes a number as parameter,
    tests if it is divisible by 3 or 5, returning true if it is.
*/
function isDivisibleByThreeOrFive(i){
    return i%3==0 || i%5==0 ? true : false;     // if i can divided by 3 or 5, return true else return false
}

/**
    Write a function called projectEulerProblem1UsingImperativeSummer 
    that uses your imperativeSummer and isDivisibleByThreeOrFive to
    again solve Project Euler Problem 1.  It should be one line of code!
*/
function projectEulerProblem1UsingImperativeSummer(){
    return imperativeSummer(isDivisibleByThreeOrFive,1000)
    
}

/**
    Exercise 5:
    Write a function called 'immutableSummer' with parameters f and n, which computes the sum of numbers
    from 1 up to (but not including) n that satisfy f, but does *not* use while,
    for or any mutable variables (defined with let or var).
    Hint: use recursion!
*/

function immutableSummer(f,n) {
    // if (f(n-1) === true && n-1>0 === true){      // if f(n-1) return true and n-1 is greater than 0
    //     return n-1 + immutableSummer(f,n-1)
    // }else if (f(n-1) === false){                 // else if f(n-1) is false
    //     return immutableSummer(f,n-1)            // do not add it with previous result, perform immutaleSummer with the next integer only
    // }else{
    //   return 0                                   // base case
    // }
    return  n ? (f(n-1)? n-1 + immutableSummer(f, n-1) : immutableSummer(f, n-1)) : 0;
}
   

/*
    Write a function called projectEulerProblem1UsingImmutableSummer 
    that uses your immutableSummer and isDivisibleByThreeOrFive to
    again solve Project Euler Problem 1.  It should be one line of code!
*/

function projectEulerProblem1UsingImmutableSummer(){
    return immutableSummer(isDivisibleByThreeOrFive,1000)
}

