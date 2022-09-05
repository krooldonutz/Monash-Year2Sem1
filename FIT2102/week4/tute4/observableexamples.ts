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
 * Complete Worksheet 4/5 by entering code in the places marked below...
 *
 * For full instructions and tests open the file observableexamples.html
 * in Chrome browser.  Keep it open side-by-side with your editor window.
 * You will edit this file (observableexamples.ts), save it, build it, and reload the
 * browser window to run the test.
 */

import { interval, fromEvent, zip, merge, from} from "rxjs";
import { map, filter } from "rxjs/operators";

// Simple demonstration
// ===========================================================================================
// ===========================================================================================
/**
 * an example of traditional event driven programming style - this is what we are
 * replacing with observable.
 * The following adds a listener for the mouse event
 * handler, sets p and adds or removes a highlight depending on x position
 */
function mousePosEvents() {
  const pos = document.getElementById("pos")!;
  
  document.addEventListener("mousemove", ({ clientX, clientY }) => {
    const p = clientX + ", " + clientY;
    pos.innerHTML = p;
    if (clientX > 400) {
      pos.classList.add("highlight");
    } else {
      pos.classList.remove("highlight");
    }
  });
}

/**
 * constructs an Observable event stream with three branches:
 *   Observable<x,y>
 *    |- set <p>
 *    |- add highlight
 *    |- remove highlight
 */
function mousePosObservable() {
  const pos = document.getElementById("pos")!,
    o = fromEvent<MouseEvent>(document, "mousemove").pipe(
      map(({ clientX, clientY }) => ({ x: clientX, y: clientY }))
    );

  o.pipe(map(({ x, y }) => `${x},${y}`)).subscribe(
    (s: string) => (pos.innerHTML = s)
  );

  o.pipe(filter(({ x }) => x > 400)).subscribe((_) =>
    pos.classList.add("highlight")
  );

  o.pipe(filter(({ x }) => x <= 400)).subscribe(({ x, y }) => {
    pos.classList.remove("highlight");
  });
}

// Exercise 5
// ===========================================================================================
// ===========================================================================================
function piApproximation() {
  // a simple, seedable, pseudo-random number generator
  class RNG {
    // LCG using GCC's constants
    m = 0x80000000; // 2**31
    a = 1103515245;
    c = 12345;
    state: number;
    constructor(seed: number) {
      this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
    }
    nextInt() {
      this.state = (this.a * this.state + this.c) % this.m;
      return this.state;
    }
    nextFloat() {
      // returns in range [0,1]
      return this.nextInt() / (this.m - 1);
    }
  }

  const resultInPage = document.getElementById("value_piApproximation"),
    canvas = document.getElementById("piApproximationVis");

  if (!resultInPage || !canvas) {
    console.log("Not on the observableexamples.html page");
    return;
  }

  // Some handy types for passing data around
  type Colour = "red" | "green";
  type Dot = { x: number; y: number; colour?: Colour };
  interface Data {
    point?: Dot;
    insideCount: number;
    totalCount: number;
  }

  // an instance of the Random Number Generator with a specific seed
  const rng = new RNG(20);
  // return a random number in the range [-1,1]
  const nextRandom = () => rng.nextFloat() * 2 - 1;
  // you'll need the circleDiameter to scale the dots to fit the canvas
  const circleRadius = Number(canvas.getAttribute("width")) / 2;
  // test if a point is inside a unit circle
  const inCircle = ({ x, y }: Dot) => x * x + y * y <= 1;
  // you'll also need to set innerText with the pi approximation
  resultInPage.innerText =
    "...Update this text to show the Pi approximation...kontol";
  const data = {insideCount: 0, totalCount:0}

  // Your code starts here!
  // =========================================================================================

  function createDot(xInput: number,yInput: number ) {
    if (!canvas) throw "Couldn't get canvas element!";
    const dot = document.createElementNS(canvas.namespaceURI, "circle");
    let newDot: Dot = {x: xInput+circleRadius,y: yInput+circleRadius}
    if (inCircle({x: xInput,y: yInput})){
      newDot = {x: xInput+circleRadius,y: yInput+circleRadius, colour: "green"}
      data.insideCount++
    }
    else{newDot = {x: xInput+circleRadius,y: yInput+circleRadius, colour: "red"}}
    data.totalCount++
    const x = newDot.x,
      y = newDot.y; // all points are at 50,50!
    // Set circle properties
    dot.setAttribute("cx", String(xInput*circleRadius+circleRadius));
    dot.setAttribute("cy", String(yInput*circleRadius+circleRadius));
    dot.setAttribute("r", "5");
    dot.setAttribute("fill", newDot.colour); // All points red
    resultInPage.innerText = String(data.totalCount) + " Inner count = " + String(data.insideCount)
    // Add the dot to the canvas
    canvas.appendChild(dot);
  }

  // A stream of random numbers
  const randomNumberStream = interval(10).pipe(map(nextRandom));
  zip(randomNumberStream, randomNumberStream).subscribe(pair => createDot(pair[0], pair[1]))
}

// Exercise 6
// ===========================================================================================
// ===========================================================================================
/**
 * animates an SVG rectangle, passing a continuation to the built-in HTML5 setInterval function.
 * a rectangle smoothly moves to the right for 1 second.
 */
function animatedRectTimer() {
  // get the svg canvas element
  const svg = document.getElementById("animatedRect")!;
  // create the rect
  const rect = document.createElementNS(svg.namespaceURI, "rect");
  Object.entries({
    x: 100,
    y: 70,
    width: 120,
    height: 80,
    fill: "#95B3D7",
  }).forEach(([key, val]) => rect.setAttribute(key, String(val)));
  svg.appendChild(rect);

  const animate = setInterval(
    () => rect.setAttribute("x", String(1 + Number(rect.getAttribute("x")))),
    10
  );
  const timer = setInterval(() => {
    clearInterval(animate);
    clearInterval(timer);
  }, 1000);
}

/**
 * Demonstrates the interval method
 * You want to choose an interval so the rectangle animates smoothly
 * It terminates after 1 second (1000 milliseconds)
 */
function animatedRect() {
  function move(input: number){
    rect.setAttribute("x", String(input+ Number(rect.getAttribute("x")))),10
  }
  // Your code starts here!
  // =========================================================================================
  // ...
  const svg = document.getElementById("animatedRect")!;
  // create the rect
  const rect = document.createElementNS(svg.namespaceURI, "rect");
  Object.entries({
    x: 100,
    y: 70,
    width: 120,
    height: 80,
    fill: "#95B3D7",
  }).forEach(([key, val]) => rect.setAttribute(key, String(val)));
  svg.appendChild(rect);
  const stream = interval(50).subscribe(move)
  setTimeout(() => {
    stream.unsubscribe();
  }, 1000);
}

// Exercise 7
// ===========================================================================================
// ===========================================================================================
/**
 * Create and control a rectangle using the keyboard! Use only one subscribe call and not the interval method
 * If statements
 */

 function keyboardControl() {
   // get the svg canvas element
   const svg = document.getElementById("moveableRect")!;
   const rect = document.createElementNS(svg.namespaceURI,'rect')
   Object.entries({
     x: 100, y: 70,
     width: 120, height: 80,
     fill: '#95B3D7',
   }).forEach(([key,val])=>rect.setAttribute(key,String(val)))
   svg.appendChild(rect);


   const MOVEMENT_SPEED = 100;
   const arrowDown$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(filter(event => event.key == 'ArrowDown' || event.key == "s"), map(_ => ({x: 0, y: 1})));
   const arrowUp$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(filter(event => event.key == 'ArrowUp' || event.key == "w"), map(_ => ({x: 0, y: -1})));
   const arrowLeft$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(filter(event => event.key == 'ArrowLeft' || event.key == "a"), map(_ => ({x: -1, y: 0})));
   const arrowRight$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(filter(event => event.key == 'ArrowRight' || event.key == "d"), map(_ => ({x: 1, y: 0})));
   merge(arrowDown$, arrowUp$, arrowLeft$, arrowRight$)
   .subscribe(({x, y}) => { 
    rect.setAttribute('x', String(x*MOVEMENT_SPEED + Number(rect.getAttribute('x')))); 
    rect.setAttribute('y', String(y*MOVEMENT_SPEED + Number(rect.getAttribute('y'))));
  });
}


// Running the code
// ===========================================================================================
// ===========================================================================================
document.addEventListener("DOMContentLoaded", function (event) {
  piApproximation();

  // compare mousePosEvents and mousePosObservable for equivalent implementations
  // of mouse handling with events and then with Observable, respectively.
  //mousePosEvents();
  mousePosObservable();

  animatedRect();
  // replace the above call with the following once you have implemented it:
  //animatedRect()
  keyboardControl();
  
 
  fromEvent(document, "click")
 
    .pipe(
 
      map ((x) => x + 1 ),
 
      filter ((_) => from([1, 2, 3]) )
 
    )
 
    .subscribe(console.log);
});
