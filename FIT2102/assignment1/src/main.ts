import "./style.css";
import { fromEvent, interval, merge} from 'rxjs'; 
import { filter, scan,  map } from 'rxjs/operators';


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
      CanvasSize: 900,
      
    } as const
    type ViewType = 'car' | 'frog' | 'log'

//     class Direction {
//       directionX: number
//       directionY: number
//       constructor(directionX:number, directionY: number){
//         this.directionX = directionX
//         this.directionY = directionY
//       }
// }
  class Direction{constructor(public readonly directionX: number, public readonly directionY: number) {}}
    class Tick { constructor(public readonly elapsed:number) {} } 

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
      //id: String
    }
    type Body = Readonly<IBody>
    

    type State = Readonly<{
      frog:Body,
      oneCar: Body
      car1:ReadonlyArray<Body>
      car2:ReadonlyArray<Body>
      car3:ReadonlyArray<Body>
      // log:ReadonlyArray<Body>,
      //exit:ReadonlyArray<Body>,
      objCount:number
      // gameOver:boolean
    }>

   

    function createCarAux(x: number, y: number):Body{
      return{
          //id: "kontol",
          positionX: x,
          positionY: y
      }
    }
    
    

    function createFrog():Body {
      return{
        //id: "ship",
        // viewType: "frog",
        positionX: 400,
        positionY: 800,
        
      }
    }
    const initialState: State ={
      frog: createFrog(),
      oneCar: createCarAux(0,725),
      car1: [createCarAux(0, 725)],
      car2: [createCarAux(0, 600), createCarAux(-100, 600)],
      car3: [createCarAux(0, 500), createCarAux(-200, 500)],
      objCount: 0
    }

    const moveCar = (c: Body) => {
      return {...c,
        positionX: c.positionX + 1
      }
    }

    const tick =(s: State) => {
      return {...s,
        oneCar: {
          positionX: s.oneCar.positionX + 0.5,
          positionY: s.oneCar.positionY
        }
    }
    }


    const reduceState = (s: State, e: Direction | any) => {
      
      if (e instanceof Direction){
        return changeFrogPos(s,e)
      }
      
      else{
        return tick(s)
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
    
    
   const gameClock = interval(10).pipe(
      map(elapsed => elapsed)
   )
      merge(moveUpArrow$,moveDownArrow$,moveLeftArrow$,moveRightArrow$,moveDownS$,
        moveUpW$,moveLeftA$,moveRightD$, gameClock).pipe(
          scan(reduceState, initialState)
        ).subscribe(updateView)
        
        
    

    
      

    function updateView(s: State){
      const
      svg = document.getElementById("svgCanvas")!,
      frog = document.getElementById("frog")!
      
      //console.log(s.frog.positionX, s.frog.positionY)
      frog.setAttribute("x", String(s.frog.positionX) )
      frog.setAttribute("y", String(s.frog.positionY))
      const updateBodyView = (b: Body) => {
        function createBodyView(){
          const car = document.createElementNS(svg.namespaceURI, "rect")!;
          car.setAttribute("id", "kontol")
          car.setAttribute("width", "100")
          car.setAttribute("height", "50")
          car.setAttribute("x", String(b.positionX))
          console.log(b.positionY)
          car.setAttribute("y", String(b.positionY))
          svg.appendChild(car)
          return car
        }
        const car = document.getElementById("kontol") || createBodyView()
        car.setAttribute("x", String(b.positionX))
        car.setAttribute("y", String(b.positionY))
      }
      
      updateBodyView(s.oneCar)
    }
    
    }


// The following simply runs your main function on window load.  Make sure to leave it in place.
if (typeof window !== "undefined") {
  window.onload = () => {
    main();
  };
}
