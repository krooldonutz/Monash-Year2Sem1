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
          moveDownArrow$ = keyObservable('keydown','ArrowDown',()=>new Direction(0,100))
          
    interface IBody{
      width: number
      height: number
      positionX: number
      positionY: number
      //viewType: ViewType
      id: String
      direction: String
    }
    type Body = Readonly<IBody>
    

    type State = Readonly<{
      frog:Body,
      lane1:ReadonlyArray<Body>
      lane2:ReadonlyArray<Body>
      lane3:ReadonlyArray<Body>
      logLane1:ReadonlyArray<Body>
      // logLane2:ReadonlyArray<Body>
      // logLane3:ReadonlyArray<Body>
      //exit:ReadonlyArray<Body>,
      //objCount:number
      gameOver:boolean
    }>

   
    
    function createCar(x: number, y: number, direction: String):Body{
      return{
          height: 100,
          width: 100,
          positionX: x,
          positionY: y,
          id: "Car = "+String(x + y),
          direction: direction
      }
    }
    
    function createLog(x: number, y: number, direction: String): Body{
      return{
        height: 100,
        width: 200,
        positionX: x,
        positionY: y,
        id: "Log = "+ String(x + y),
        direction: direction
    }
    }
    

    function createFrog():Body {
      return{
        height: 100,
          width: 100,
        id: "frog",
        positionX: 400,
        positionY: 800,
        direction: "frog"
      }
    }
    const initialState: State ={
      frog: createFrog(),
      lane1: [createCar(700, 700,"left"), createCar(-200,700,"left")],
      lane2: [createCar(500, 600,"right"), createCar(100, 600,"right"), createCar(-400, 600, "right")],
      lane3: [createCar(800, 500, "left"), createCar(300, 500, "left"), createCar(-100, 500, "left")],
      logLane1: [createLog(100, 300, "left"), createLog(-100, 200, "right"), createLog(100, 100, "left")],
      // logLane2: [],
      // logLane3: [],
      //objCount: 0,
      gameOver: false
    }

    const moveCar = (c: Body) => {
      let dir = 0
      if (c.direction == "left"){
        dir = -1
      }
      else if (c.direction == "right"){
        dir = 1
      }
      if (c.positionX == 900 && dir == 1){
        return {...c,
          height: 100,
          width: 100,
          id: c.id,
          positionX: 0,
          positionY: c.positionY
          
        }
      }

      if (c.positionX == -100 && dir == -1){
        return {...c,
          height: 100,
          width: 100,
          id: c.id,
          positionX: 900,
          positionY: c.positionY
          
        }
      }
      return {...c,
        height: c.height,
          width: c.width,
        id: c.id,
        positionX: c.positionX + 1 * dir,
        positionY: c.positionY
      }
    }

    const handleCollissions = (s: State) => {
      const 
      bodiesCollided = ([frog,b]:[Body,Body]) => 
      {
        // if (b.width <= 100){
        if (frog.positionX < b.positionX + b.width &&
          frog.positionX + frog.width > b.positionX &&
           frog.positionY < b.positionY+ b.height &&
           frog.positionY + frog.height > b.positionY){

            return true
           }
          
        // if (b.width >100){
        //     if (frog.positionX < b.positionX + b.width &&
        //       frog.positionX + frog.width > b.positionX &&
        //        frog.positionY < b.positionY+ b.height &&
        //        frog.positionY + frog.height > b.positionY){
               
        //         return true
        //        }
        //   }
        

      }
                          ,
      frogCollided1 = s.lane1.filter(r => bodiesCollided([s.frog, r])). length > 0,
      frogCollided2 = s.lane2.filter(r => bodiesCollided([s.frog, r])). length > 0,
      frogCollided3 = s.lane3.filter(r => bodiesCollided([s.frog, r])). length > 0,
      logStand = s.logLane1.filter(r => bodiesCollided([s.frog, r])),
      frogCollidedFinal = frogCollided1 || frogCollided2 || frogCollided3
      

      if (s.frog.positionX == 801 || s.frog.positionX == -1){
        return{
          ...s,
          gameOver: true
        }
      }
      if (logStand.length <= 0){
        if (s.frog.positionY >= 100 && s.frog.positionY <= 300){
          return{
            ...s,
            gameOver: true
          }
        }
      else return{
        ...s,
        gameOver: frogCollidedFinal
      }}

      else if (logStand.length >= 1){
        console.log(logStand)
        let dir = 0
        if (logStand.at(0)?.direction == "left"){
          dir = -1
        }
        else if (logStand.at(0)?.direction == "right"){
          dir = 1
        }
        return{
          ...s,
          logLane1: s.logLane1,
          lane1: s.lane1,
          lane2: s.lane2,
          lane3: s.lane3,
          //objCount: s.objCount,
          gameOver: s.gameOver,
          frog: {
            height: 100,
            width: 100,
            id: "frog",
            positionX: s.frog.positionX + 1 * dir,
            positionY: s.frog.positionY,
           
          }
        }
      }
    }
    
    const tick =(s: State) => {
     return handleCollissions({...s,
      logLane1: s.logLane1.map(moveCar),
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
      function roundNearest100(num: number) {
        return Math.round(num / 100) * 100;
      }
      let x: number = roundNearest100(s.frog.positionX)
      let y: number  = roundNearest100(s.frog.positionY)

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
          positionY: y,
         // viewtype: s.frog.viewType
        }
    }}
    
    
   const gameClock = interval(10).pipe(
      map(elapsed => elapsed)
   )
     const mainStream = merge(moveUpArrow$,moveDownArrow$,moveLeftArrow$,moveRightArrow$,gameClock).pipe(
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
          car.setAttribute("width", String(b.width))
          car.setAttribute("height", String(b.height))
          car.setAttribute("x", String(b.positionX))
          car.setAttribute("y", String(b.positionY))
          svg.appendChild(car)
          return car
        }
        
        const car = document.getElementById(String(b.id)) || createBodyView()
        car.setAttribute("x", String(b.positionX))
        car.setAttribute("y", String(b.positionY))
      }
      
      s.logLane1.forEach(updateBodyView)
      svg.appendChild(frog)
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
