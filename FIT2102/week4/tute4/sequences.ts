/**
 * Surname     | Firstname | Contribution % | Any issues?
 * =====================================================
 * Person 1... |           | 25%            |
 * Person 2... |           | 25%            |
 * Person 3... |           | 25%            |
 * Person 4... |           | 25%            |
 *
 * Please do not hesitate to contact your tutors if there are
 * issues that you cannot resolve within the group.
 *
 * Complete Worksheet 4 by entering code in the places marked below...
 *
 * For full instructions and tests open the file worksheetChecklist.html
 * in Chrome browser.  Keep it open side-by-side with your editor window.
 * You will edit this file (main.ts), save it, build it, and reload the
 * browser window to run the test.
 */

import { concat } from "rxjs";

/**
 * Replace references to IMPLEMENT_THIS with your code!
 */
const IMPLEMENT_THIS: any = undefined;

/**
 *  Exercise 1 - General Purpose infinite sequence function
 */

interface LazySequence<T> {
  value: T;
  next(): LazySequence<T>;
}

// Implement the function:
function initSequence<T>(transform: (value: T) => T):(initialValue: T) =>LazySequence<T> {
  return function aux(v: T) : LazySequence<T>{
    return {
      value: v,
      next: () => aux(transform(v))
    }
  }
}

/**
 *  Exercise 2 - map, filter, take, reduce
 */

function map<T, V>(func: (v: T) => V, seq: LazySequence<T>): LazySequence<V> {
  return {
    value: func(seq.value),
    next: () => map(func, seq.next())
  }
}

function filter<T>(func: (v: T) => boolean,seq: LazySequence<T>): LazySequence<T> {
  if (func(seq.value)){
    return{value: seq.value,
            next: () => filter(func, seq.next())}
  }
  else{return filter(func, seq.next())}
}

/**
 * Creates a sequence of finite length (terminated by undefined) from a longer or infinite sequence.
 * Take returns a sequence that contains the specified number of elements of the sequence, and then 'undefined'.
 * That is, the next attribute of the last element in the returned sequence, will be a function that returns 'undefined'.
 *
 * @param n number of elements to return before returning undefined
 * @param seq the sequence
 */
function take<T>(n: number, seq: LazySequence<T>): LazySequence<T> | undefined {
  if (n <= 0) {
    return undefined;
  }

  return {
    value: seq.value,
    /**
     * We have to cast the type here due to the limitations of the TypeScript type system.
     * If you have to type cast something, make sure to justify it in the comments.
     */
    next: () => take(n - 1, seq.next()) as LazySequence<T>,
  };
}

/**
 * reduce a finite sequence to a value using the specified aggregation function
 * @param func aggregation function
 * @param seq either a sequence or undefined if we have reached the end of the sequence
 * @param start starting value of the reduction past as first parameter to first call of func
 */
function reduce<T, V>(
  func: (_: V, x: T) => V,
  seq: LazySequence<T> | undefined,
  start: V
): V {
  if(seq === undefined){return start};
  return reduce(func, seq.next(),func(start, seq.value))
}

function reduceRight<T, V>(
  f: (_: V, x: T) => V,
  seq: LazySequence<T> | undefined,
  start: V
): V {
  if(seq === undefined){return start};
  return f(reduceRight(f, seq.next(), start), seq.value);
}

/**
 *  Exercise 3 - Reduce Practice
 */

function maxNumber(lazyList: LazySequence<number>): number {
  // ******** YOUR CODE HERE ********
  // Use __only__ reduce on the
  // lazyList passed in. The lazyList
  // will terminate so don't use `take`
  // inside this function body.
  
  return reduce(((x,y) => x>y ? x:y),lazyList, lazyList.value)
}

function lengthOfSequence(lazyList: LazySequence<any>): number {
  // ******** YOUR CODE HERE ********
  // Again only use reduce and don't
  // use `take` inside this function.
  return reduce(((x) => x+1), lazyList, 0);
}

function toArray<T>(seq: LazySequence<T>): T[] {
  // ******** YOUR CODE HERE ********
  // Again only use reduce and don't
  // use `take` inside this function.
  return reduce((x,y) => x.concat(y),seq,Array() );
}

/**
 *  Exercise 4 - Lazy Pi Approximations
 */

function exercise4Solution(seriesLength: number): number {
  // Your solution using lazy lists.
  // Use `take` to only take the right amount of the infinite list.
  function next_(x: number){
    return -1 * (x > 0 ? x+2 : x-2);
  };

// return reduce((a,b)=>a+b, take(seriesLength,
//                             map(x=>1/x, 
//                             initSequence(next_)(1)) ), 0)
const seq = initSequence(next_)(1);
const seq2 = take(seriesLength, seq)
const ret = map(x=>1/x, seq)
}
// Hint (highlight to show):

// - Use reduce to accumulate the series.
// - Generate a sequence of odd numbers with alternating signs.
//   (+1, -3, +5, -7, ...)
// - Use `take`, `reduce` and `map` to generate the approximation. 
// Exercise Test Results:




