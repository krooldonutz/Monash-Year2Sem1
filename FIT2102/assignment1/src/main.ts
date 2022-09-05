import "./style.css";
import { fromEvent, interval, pipe,merge } from 'rxjs'; 
import { map, filter, scan, reduce } from 'rxjs/operators';


type Key = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' |"ArrowDown"| "w" | "a" | "s" | "d"
type Event = 'keydown' | 'keyup'

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
  

  const
    Constants = {
      CanvasSize: 900
    } as const
    type ViewType = 'car' | 'frog' | 'log'

    class Direction {
      directionX: number
      directionY: number
      constructor(directionX:number, directionY: number){
        this.directionX = directionX
        this.directionY = directionY
      }
}
    

      const 
    
    keyObservable = <T>(e:Event, k:Key, result:()=>T)=>
      fromEvent<KeyboardEvent>(document,e)
        .pipe(
          filter(({code})=>code === k),
          filter(({repeat})=>!repeat),
          map(result)),
          moveLeftArrow$ = keyObservable('keydown','ArrowLeft' ,()=>new Direction(-100,0)),
          moveRightArrow$ = keyObservable('keydown','ArrowRight',()=>new Direction(100,0)),
          moveUpArrow$ = keyObservable('keydown','ArrowUp',()=> new Direction(0,-100)),
          moveDownArrow$ = keyObservable('keydown','ArrowDown',()=>new Direction(0,100)),
          moveLeftA$ = keyObservable('keydown','a' ,()=>new Direction(-100,0)),
          moveRightD$ = keyObservable('keydown','d',()=>new Direction(100,0)),
          moveUpW$ = keyObservable('keydown','w',()=> new Direction(0,-100)),
          moveDownS$ = keyObservable('keydown','s',()=>new Direction(0,100))
         

          
    
    interface IBody{
      positionX: number
      positionY: number
    }
    type Body = Readonly<IBody>

    type State = Readonly<{
      frog:Body,
      car:ReadonlyArray<Body>
      // log:ReadonlyArray<Body>,
      //exit:ReadonlyArray<Body>,
      // objCount:number,
      // gameOver:boolean
    }>

    function createCar(s:State, x: number, y: number): Body{
      return {...s,
          car: s.car.concat(createCarAux(x,y))

      }
    }

    function createCarAux(x: number, y: number):Body{
      return{
          positionX: x,
          positionY: y
      }
    }
    
    function moveCar(speed: number, car: Body){
      return {...car,
        positionX: car.positionX + 100
      }
    }

    function createFrog():Body {
      return{
        // id: "ship",
        // viewType: "frog",
        positionX: 400,
        positionY: 800,
        
      }
    }
    const initialState: State ={
      frog: createFrog(),
      car: []
    }
    const reduceState = (s: State, e: Direction) => {
      if (e instanceof Direction){
        return changeFrogPos(s,e)
      }
    }
    const changeFrogPos =(s: State, e: Direction ) => {
      
      let x: number = s.frog.positionX
      let y: number  = s.frog.positionY

        if (e.directionX + s.frog.positionX <= 800 && e.directionX == 100)
          { x = e.directionX + s.frog.positionX}
        if (e.directionX + s.frog.positionX >= 0 && e.directionX == -100)
          { x = e.directionX + s.frog.positionX}
        if (e.directionY + s.frog.positionY <=800 && e.directionY == 100)
          {y = e.directionY + s.frog.positionY}
        if (e.directionY + s.frog.positionY >=0 && e.directionY == -100)
          {y = e.directionY + s.frog.positionY}
        return {...s,
        frog: {
          positionX: x,
          positionY: y
        }
    }}
    

    function updateView(s: State){
      const
      svg = document.getElementById("svgCanvas")!,
      frog = document.getElementById("frog")!
      
      console.log(s.frog.positionX, s.frog.positionY)
      frog.setAttribute("x", String(s.frog.positionX) )
      frog.setAttribute("y", String(s.frog.positionY))
      
      
    }
    
    
    merge(moveUpArrow$,moveDownArrow$,moveLeftArrow$,moveRightArrow$,moveDownS$,
          moveUpW$,moveLeftA$,moveRightD$)
          .pipe(
            scan(reduceState, initialState)
            )
          .subscribe(updateView)
    }


// The following simply runs your main function on window load.  Make sure to leave it in place.
if (typeof window !== "undefined") {
  window.onload = () => {
    main();
  };
}
