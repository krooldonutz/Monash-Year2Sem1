
import "./style.css";
import { interval, fromEvent, zip, merge} from "rxjs";
import { map, filter } from "rxjs/operators";


function main() {
  /**
   * Inside this function you will use the classes and functions from rx.js
   * to add visuals to the svg element in pong.html, animate them, and make them interactive.
   *
   * Study and complete the tasks in observable examples first to get ideas.
   *
   * Course Notes showing Asteroids in FRP: https://tgdwyer.github.io/asteroids/
   *
   * You will be marked on your functional programming style
   * as well as the functionality that you implement.
   *
   * Document your code!
   */

  /**
   * This is the view for your game to add and update your game elements.
   */

  type Key = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' |"ArrowDown"| "w" | "a" | "s" | "d"

  type ViewType = 'car' | 'frog' | 'log'



  const svg = document.querySelector("#svgCanvas") as SVGElement & HTMLElement;
  
  // rows of rivers and roads
 const road = document.createElementNS(svg.namespaceURI,'rect')
 Object.entries({
   x:0, y: 500,
   width: 900, height: 300,
   fill: '#808080',
 }).forEach(([key,val])=>road.setAttribute(key,String(val)))
 svg.appendChild(road);

 const river = document.createElementNS(svg.namespaceURI,'rect')
 Object.entries({
   x:0, y: 100,
   width: 900, height: 300,
   fill: '#00008B',
 }).forEach(([key,val])=>river.setAttribute(key,String(val)))
 svg.appendChild(river);

 
 
  const rect = document.createElementNS(svg.namespaceURI,'rect')
  Object.entries({
    x: 400, y: 800,
    width: 100, height: 100,
    fill: '#95B3D7',
  }).forEach(([key,val])=>rect.setAttribute(key,String(val)))
  svg.appendChild(rect);
  
  animatedCar(svg, -100, 700, 100)

    destinationRect(svg, 100, 0)
    destinationRect(svg, 300, 0)
    destinationRect(svg, 500, 0)
    destinationRect(svg, 700, 0)

  const MOVEMENT_SPEED = 100;
  const arrowDown$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(filter(event => event.key == 'ArrowDown' || event.key == "s"), map(_ => ({x: 0, y: 1})));
  const arrowUp$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(filter(event => event.key == 'ArrowUp' || event.key == "w"), map(_ => ({x: 0, y: -1})));
  const arrowLeft$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(filter(event => event.key == 'ArrowLeft' || event.key == "a"), map(_ => ({x: -1, y: 0})));
  const arrowRight$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(filter(event => event.key == 'ArrowRight' || event.key == "d"), map(_ => ({x: 1, y: 0})));
  merge(arrowDown$, arrowUp$, arrowLeft$, arrowRight$)
  .subscribe(({x,y}) => { 
  let direction = null
  if (x == 0){
    if (y == 1){
      direction = "down"
    }
    else if (y == -1){
      direction = "up"
    }
  }
  if (y == 0){
    if (x == 1){
      direction = "right"
    }
    else if (x == -1){
      direction = "left"
    }
  }

  if (Number(rect.getAttribute('y')) < 800 && direction == "down"){
    rect.setAttribute('x', String(0*MOVEMENT_SPEED + Number(rect.getAttribute('x')))); 
    rect.setAttribute('y', String(1*MOVEMENT_SPEED + Number(rect.getAttribute('y'))));
  }
  
  if (Number(rect.getAttribute('y')) > 0 && direction == "up"){
    rect.setAttribute('x', String(0*MOVEMENT_SPEED + Number(rect.getAttribute('x')))); 
    rect.setAttribute('y', String(-1*MOVEMENT_SPEED + Number(rect.getAttribute('y'))));
  }
  if (Number(rect.getAttribute('x')) < 800 && direction == "right"){
    rect.setAttribute('x', String(1*MOVEMENT_SPEED + Number(rect.getAttribute('x')))); 
    rect.setAttribute('y', String(0*MOVEMENT_SPEED + Number(rect.getAttribute('y'))));
  }
  if (Number(rect.getAttribute('x')) > 0 && direction == "left"){
    rect.setAttribute('x', String(-1*MOVEMENT_SPEED + Number(rect.getAttribute('x')))); 
    rect.setAttribute('y', String(0*MOVEMENT_SPEED + Number(rect.getAttribute('y'))));
  }
  console.log(direction, [rect.getAttribute("x"), rect.getAttribute("y")])
  
   
 });
  
 

}

function torusWrap(x: number,y: number = 0, svg: SVGElement) { 
  const s= 900
    const wrap = (v:number) => v < 0 ? v + s : v > s ? v - s : v;
  return wrap(x),wrap(y)
}

function animatedCar(svg: SVGElement, x: number, y: number, speed: number) {
  // Your code starts here!
  // =========================================================================================
  // ...
  
  // create the rect
  const rect = document.createElementNS(svg.namespaceURI,'rect')
  Object.entries({
    x: x, y: y,
    width: 120, height: 80,
    fill: '#95B3D7',
  }).forEach(([key,val])=>rect.setAttribute(key,String(val)))
  svg.appendChild(rect);


  const oneStream = interval(50).pipe(map(x=>speed))
  const stream1 = oneStream.subscribe(moveRectangle)
  
function moveRectangle(amount:number) {
  
  rect.setAttribute('x', String(amount + Number(rect.getAttribute('x'))));
  if (Number(rect.getAttribute('x')) > 900){
    rect.setAttribute('x', String(-100));
  }
  return rect
}
}
function destinationRect(svg: SVGElement, x: number, y:number){
  const rect = document.createElementNS(svg.namespaceURI,'rect')
  Object.entries({
    x: x, y: y,
    width: 100, height: 100,
    fill: '#ff0000',
  }).forEach(([key,val])=>rect.setAttribute(key,String(val)))
  svg.appendChild(rect);
}

function animatedLog(svg: SVGElement, x: number, y: number, width: number, height: number) {
  // Your code starts here!
  // =========================================================================================
  // ...
  
  // create the rect
  const rect = document.createElementNS(svg.namespaceURI,'rect')
  Object.entries({
    x: x, y: y,
    width: width, height: height,
    fill: '#C19A6B',
  }).forEach(([key,val])=>rect.setAttribute(key,String(val)))
  svg.appendChild(rect);


  const oneStream = interval(50).pipe(map(x=>5))
  const stream1 = oneStream.subscribe(moveRectangle)
  // const timer = Observable<number>  = timer(1000)
  // const timerStream = timer.subscribe(checkTime)

 setTimeout(() => {
  stream1.unsubscribe();
  console.log("deletedLog")
}, 20000);

function moveRectangle(amount:number) {
  rect.setAttribute('x', String(amount + Number(rect.getAttribute('x'))));
  if (Number(rect.getAttribute('x')) > 900){
    rect.setAttribute('x', String(-100));
  }
  return rect
}
}
function rowObjectsAppend(object: String, amount: number,svg: SVGElement, x:number, y:number,speed: number ){
  if (object == "car"){
      
  }
}

 
// The following simply runs your main function on window load.  Make sure to leave it in place.
if (typeof window !== "undefined") {
  window.onload = () => {
    main();
  };
}


