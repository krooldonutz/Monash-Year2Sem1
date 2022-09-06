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
      width: number
      height: number
      positionX: number
      positionY: number
      id: String
    }
    type Body = Readonly<IBody>
    

    type State = Readonly<{
      frog:Body,
      lane1:ReadonlyArray<Body>
      lane2:ReadonlyArray<Body>
      lane3:ReadonlyArray<Body>
      logLane1:ReadonlyArray<Body>
      logLane2:ReadonlyArray<Body>
      logLane3:ReadonlyArray<Body>
      //exit:ReadonlyArray<Body>,
      objCount:number
      gameOver:boolean
    }>

   
    
    function createCar(x: number, y: number):Body{
      return{
          height: 100,
          width: 100,
          positionX: x,
          positionY: y,
          id: String(x + y) +" = Car"
      }
    }
    
    function createLog(x: number, y: number): Body{
      return{
        height: 100,
        width: 200,
        positionX: x,
        positionY: y,
        id: String(x + y)+" = Log"
    }
    }
    

    function createFrog():Body {
      return{
        height: 100,
          width: 100,
        id: "frog",
        positionX: 400,
        positionY: 800,
        
      }
    }
    const initialState: State ={
      frog: createFrog(),
      lane1: [createCar(700, 700), createCar(-200,700)],
      lane2: [createCar(500, 600), createCar(100, 600), createCar(-400, 600)],
      lane3: [createCar(800, 500), createCar(300, 500), createCar(-100, 500)],
      logLane1: [createLog(100, 300)],
      logLane2: [],
      logLane3: [],
      objCount: 0,
      gameOver: false
    }

    const moveCar = (c: Body) => {
      if (c.positionX == 900){
        return {...c,
          height: 100,
          width: 100,
          id: c.id,
          positionX: 0,
          positionY: c.positionY
        }
      }
      return {...c,
        height: 100,
          width: 100,
        id: c.id,
        positionX: c.positionX + 1,
        positionY: c.positionY
      }
    }

    const handleCollissions = (s: State) => {
      const 
      bodiesCollided = ([frog,b]:[Body,Body]) => 
      {
        if (frog.positionX < b.positionX + b.width &&
          frog.positionX + frog.width > b.positionX &&
           frog.positionY < b.positionY+ b.height &&
           frog.positionY + frog.height > b.positionY){
            console.log(b.id)
            return true
           }
      }
                          ,
      frogCollided1 = s.lane1.filter(r => bodiesCollided([s.frog, r])). length > 0,
      frogCollided2 = s.lane2.filter(r => bodiesCollided([s.frog, r])). length > 0,
      frogCollided3 = s.lane3.filter(r => bodiesCollided([s.frog, r])). length > 0,
      frogCollidedFinal = frogCollided1 || frogCollided2 || frogCollided3

      return{
        ...s,
        gameOver: frogCollidedFinal
      }
    }
    
    const tick =(s: State) => {
     return handleCollissions({...s,
      lane1 : s.lane1.map(moveCar),
      lane2 : s.lane2.map(moveCar),
      lane3: s.lane3.map(moveCar)   
  })
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
          height: 100,
          width: 100,
          id: "frog",
          positionX: x,
          positionY: y
        }
    }}
    
    
   const gameClock = interval(10).pipe(
      map(elapsed => elapsed)
   )
     const mainStream = merge(moveUpArrow$,moveDownArrow$,moveLeftArrow$,moveRightArrow$,moveDownS$,
        moveUpW$,moveLeftA$,moveRightD$, gameClock).pipe(
          scan(reduceState, initialState)
        ).subscribe(updateView)
        
      

    function updateView(s: State){
      const
      svg = document.getElementById("svgCanvas")!,
      frog = document.getElementById("frog")!
      
      console.log(s.frog.positionX, s.frog.positionY)
      frog.setAttribute("x", String(s.frog.positionX) )
      frog.setAttribute("y", String(s.frog.positionY))
      const updateBodyView = (b: Body) => {
        function createBodyView(){
          const car = document.createElementNS(svg.namespaceURI, "rect")!;
          car.setAttribute("id", String(b.id))
          car.setAttribute("width", "100")
          car.setAttribute("height", "100")
          car.setAttribute("x", String(b.positionX))
          car.setAttribute("y", String(b.positionY))
          svg.appendChild(car)
          return car
        }
        
        const car = document.getElementById(String(b.id)) || createBodyView()
        car.setAttribute("x", String(b.positionX))
        car.setAttribute("y", String(b.positionY))
      }
      
     
      s.lane1.forEach(updateBodyView)
      s.lane2.forEach(updateBodyView)
      s.lane3.forEach(updateBodyView)

      if (s.gameOver == true){
        console.log("collision")
        mainStream.unsubscribe();
      const v = document.createElementNS(svg.namespaceURI, "text")!;
     // attr(v,{x:Constants.CanvasSize/6,y:Constants.CanvasSize/2,class:"gameover"});
      v.setAttribute("x", "250")
      v.setAttribute("y", "400")
      v.setAttribute("class", "gameover")
      v.textContent = "Game Over";
      svg.appendChild(v);
      }
    }
    
    }


// The following simply runs your main function on window load.  Make sure to leave it in place.
if (typeof window !== "undefined") {
  window.onload = () => {
    main();
  };
}
