import "./style.css";
import { fromEvent, interval, merge} from 'rxjs'; 
import { filter, scan,  map } from 'rxjs/operators';


type Key = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' |"ArrowDown"| "w" | "a" | "s" | "d"| "Space"
type Event = 'keydown' | 'keyup'

function main() {

  /* Creating a constant object with the properties of CanvasSize, highSpeed, lowSpeed, and
  normalSpeed (to determine the initial speeds of an object). */
  const
    Constants = {
      CanvasSize: 900, 
      highSpeed: 2,
      lowSpeed: 0.5,
      normalSpeed: 1,
      
    } as const

  /* A Tick is a number that represents the number of milliseconds that have elapsed since the last
  tick. */
  class Tick { constructor(public readonly elapsed:number) {} }

 /* Direction is a class that has two properties, directionX and directionY, which are both numbers. */
  class Direction{constructor(public readonly directionX: number, public readonly directionY: number) {}}

  /* Reset is a class that has a readonly property called reset that is a boolean that. */
  class Reset{constructor(public readonly reset:boolean) {}}

      /**
       * `keyObservable` is a function that takes an event name, a key name, and a function that
       * returns a value, and returns an observable that emits that value when the event is triggered
       * on the document and the key matches the key name
       * @param {Event} e - The event to listen for.
       * @param {Key} k - The key we're listening for
       * @param result - ()=>T
       */
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
          spaceButton$ =keyObservable('keydown','Space',()=>new Reset(true))
          
    /* Defining an interface for the body object. */
    interface IBody{
      width: number
      height: number
      positionX: number
      positionY: number
      id: String
      direction: number
      speed: number
    }
    type Body = Readonly<IBody>
    
    /* defining a type called State, that requires the State to have the following properties*/
    type State = Readonly<{
      frog:Body,
      lane1:ReadonlyArray<Body>
      logLane1:ReadonlyArray<Body>
      score: number,
      gameOver:boolean,
      destRect: ReadonlyArray<number>
      deadRect: ReadonlyArray<number>
    }>

   
    
     /**
     * This function creates a car object with a height, width, positionX, positionY, id, direction,
     * and speed
     * @param {number} x - The x position of the car
     * @param {number} y - The y position of the car
     * @param {String} direction - 1 = right, -1 = left
     * @param {number} speed - The speed of the car
     * @returns A car object with the given parameters
     */
    function createCar(x: number, y: number, direction: String, speed: number):Body{

      if (direction == "left"){
        return{
          height: 100,
          width: 100,
          positionX: x,
          positionY: y,
          id: "Car = "+ String(x) + "," + String(y),
          direction: -1,
          speed: speed
      }
      }
      else if (direction == "right"){
        return{
          height: 100,
          width: 100,
          positionX: x,
          positionY: y,
          id: "Car = "+ String(x) + "," + String(y),
          direction: 1,
          speed: speed
      }
      }
      
      return{
        height: 100,
        width: 100,
        positionX: x,
        positionY: y,
        id: "Car = "+ String(x) + "," + String(y),
        direction: 1,
        speed: speed
    }
    }
    
    /**
     * This function creates a log object with a height, width, positionX, positionY, id, direction,
     * and speed
     * @param {number} x - The x position of the log
     * @param {number} y - The y position of the log
     * @param {String} direction - 1 = right, -1 = left
     * @param {number} speed - how fast the log moves
     * @returns A Body object with the given parameters
     */
    function createLog(x: number, y: number, direction: String, speed: number): Body{
      if (direction == "left"){
        return{
          height: 100,
          width: 200,
          positionX: x,
          positionY: y,
          id: "Log = "+ String(x) + "," + String(y),
          direction: -1,
          speed: speed
      }
      }
      else if (direction == "right"){
        return{
          height: 100,
          width: 200,
          positionX: x,
          positionY: y,
          id: "Log = "+ String(x) + "," + String(y),
          direction: 1,
          speed: speed
      }
      }
      else return{
        height: 100,
        width: 200,
        positionX: x,
        positionY: y,
        id: "Log = "+ String(x) + "," + String(y),
        direction: 1,
        speed: speed
    }
     
    }
    

    /**
     * The function createFrog() returns an object with the properties height, width, id, positionX,
     * positionY, direction, and speed
     * @returns A Body object with the properties of height, width, id, positionX, positionY, direction,
     * and speed.
     */
    function createFrog():Body {
      return{
        height: 100,
          width: 100,
        id: "frog",
        positionX: 400,
        positionY: 800,
        direction: 0,
        speed: 1
      }
    }

    /* The code under is creating the initial state of the game.*/
    const initialState: State ={
      frog: createFrog(),
      lane1: [createCar(700, 700,"left", Constants.lowSpeed), createCar(-200,700,"left", Constants.lowSpeed),
      createCar(500, 600,"right",Constants.normalSpeed), createCar(100, 600,"right", Constants.normalSpeed), createCar(-400, 600, "right", Constants.normalSpeed),
      createCar(800, 500, "left", Constants.highSpeed), createCar(300, 500, "left", Constants.highSpeed), createCar(-100, 500, "left", Constants.highSpeed)],
      
      logLane1: [createLog(100, 300, "left",Constants.lowSpeed), createLog(200, 300, "left",Constants.lowSpeed),
                  createLog(-100, 200, "right", Constants.normalSpeed), createLog(100, 200, "right", Constants.normalSpeed), createLog(300, 200, "right", Constants.normalSpeed),
                    createLog(100, 100, "left", Constants.highSpeed)],
      score: 0,
      gameOver: false,
      destRect:  [100, 300,500,700],
      deadRect: [0, 200, 400, 600]
    }

    /**
     * It takes a body and returns a new body with the same properties except for the positionX
     * property, which is incremented by (1 * the direction * the speed)
     * @param {Body} c - Body
     * @returns an object with the same properties as the original object, but with the positionX
     * property changed.
     */
    const moveBody = (c: Body) => {
      const dir = c.direction
      if (c.positionX >= 900 && dir == 1){
        return {...c,
          height: 100,
          width: 100,
          id: c.id,
          positionX: 0,
          positionY: c.positionY
        }
      }
      if (c.positionX <= -100 && dir == -1){
        return {...c,
          height: 100,
          width: 100,
          id: c.id,
          positionX: 900,
          positionY: c.positionY
          
        }
      }
      else return {...c,
        height: c.height,
          width: c.width,
        id: c.id,
        positionX: c.positionX  + 1 * dir * c.speed,
        positionY: c.positionY
      }
    }

    
    const handleCollissions = (s: State) => {
      /**
       it checks if either two objects have collided, by utilizing the "hitbox" around the objects that we have made
       * @param  - [Body,Body] - this is the type of the parameters that the function takes.
       * @returns A boolean value
       */
      const 
      bodiesCollided = ([frog,b]:[Body,Body]) => 
      {
        if (frog.positionX < b.positionX + b.width &&
          frog.positionX + frog.width > b.positionX &&
           frog.positionY < b.positionY+ b.height &&
           frog.positionY + frog.height > b.positionY){

            return true
           }
           else{
            return false
           }
      }
                          ,
      
      /* It filters through every car that have collided with the frog,
      if the list is filled with a car that has collided with the frog, then it will return true */
      frogCollided1 = s.lane1.filter(r => bodiesCollided([s.frog, r])). length > 0,
      /**
      it saves the logs that are currently being stood on by the frog
      */
      logStand = s.logLane1.filter(r => bodiesCollided([s.frog, r]))
      
     /**
      * It takes a body and a number and returns a new body with the speed added by the number
      * @param {Body} b - Body
      * @param {number} mult - number
      * @returns A new object with the same properties as the original object, but with the speed
      * property modified.
      */
      const addSpeed = (b : Body, mult:number) =>{
        return{
          ...b,
          speed: b.speed + mult
        }
    }
      /* Checking if the frog is on the set x coordinates in Constants where it will win */
      if (s.destRect.includes(s.frog.positionX) && s.frog.positionY == 0){
        /* Adding 2 to the speed of the car and the log everytime the goal is reached. */
        const carTemp = s.lane1.map(x => addSpeed(x, 2))
        const newLogSpeed = s.logLane1.map(x => addSpeed(x,2))
        
        /* The code under is updating the state of the game to reset the frog's position and 
        increasing the speed of the objects. */
        return{
          ...s,
          gameOver: false,
          frog:{
            ...s.frog,
            id: s.frog.id + String(s.frog.positionX) + ", " + String(s.frog.positionY),
            positionX: 400,
            positionY: 800
          },
          lane1: carTemp,
          logLane1: newLogSpeed
        }
      }
      /* Checking if the frog is on the set x coordinates in Constants where it will die */
      else if(s.deadRect.includes(s.frog.positionX) && s.frog.positionY == 0){
        return{
          ...s,
          gameOver: true
        }
      }
      else{
        /* game over if the frog is found out bounds */
        if (s.frog.positionX >= 850 || s.frog.positionX <= -51){
          return{
            ...s,
            gameOver: true
          }
        }
        /* checking if the frog is standing on a log */
        if (logStand.length <= 0){
          /* the game will be over if the frog is not on a log and in the river are */
          if (s.frog.positionY >= 100 && s.frog.positionY <= 300){
            return{
              ...s,
              gameOver: true
            }
          }
          else return{
          ...s,
          gameOver: frogCollided1
        }}
        
        /* The code under is checking if the frog is on a log. If it is, it will move the frog in the
        direction of the log with the same speed of the log. */
        else if (logStand.length >= 1){
          const dir = logStand.at(0)?.direction
          
          const speed =logStand.at(0)?.speed
          return{
            ...s,
            gameOver: s.gameOver,
            frog: {
              height: 100,
              width: 100,
              id: "frog",
              positionX: s.frog.positionX + 1 * dir! * speed!,
              positionY: s.frog.positionY,
            }
          }
        }
        else return{
          ...s,
          gameOver: frogCollided1}
      }}
        
       
    /**
     * It takes a state, and returns a new state where the logLane1 and lane1 arrays have been mapped
     * over with the moveBody function
     * @param {State} s - State
     * @returns The return value is a new state object with the logLane1 and lane1 arrays mapped to the
     * moveBody function which in turn moves the x-axis position 
     * of the object while simultaneously checking for collisions.
     */
    const tick =(s: State) => {
     return  handleCollissions({...s,
      logLane1: s.logLane1.map(moveBody),
      lane1 : s.lane1.map(moveBody)
  })
    }


    /**
     * `reduceState` takes a `State` and an `Event` and returns a new `State`
     * @param {State} s - State
     * @param {Direction | Tick} e - Direction | Tick
     * @returns The new state of the game.
     */
    const reduceState = (s: State, e: Direction | Tick | Reset) => {
      
      if (e instanceof Direction){
        return moveFrog(s,e)
      }
      
      else if (e instanceof Reset){
       return {
        ...initialState
       }
      }
      else if (e instanceof Tick){
        return tick(s)
      }
      else{
        console.log("undefined")
      }
    }
    
    /**
     * The function takes in a state and a direction, and returns a new state with the frog's position
     * updated based on the direction.
     * And it also ensures the player won't move the frog out of bounds manually
     * @param {State} s - State
     * @param {Direction} e - Direction
     * @returns a new state with the frog's position updated.
     */
    const moveFrog =(s: State, e: Direction ) => {
      /**
       * RoundNearest100 takes a number and returns a number.
       * @param {number} num - The number to round.
       * @returns the rounded number.
       */
      function roundNearest100(num: number) {
        return Math.round(num / 100) * 100;
      }
      /**
       this ensures that the frog's x-axis and y-axis coordinates will always be on intervals of 100
       */
      let x: number = roundNearest100(s.frog.positionX)
      let y: number  = roundNearest100(s.frog.positionY)
      let oneUp: number = 0

        if (e.directionX + s.frog.positionX <= 800 && e.directionX == 100)
          { x = e.directionX + s.frog.positionX}
        if (e.directionX + s.frog.positionX >= 0 && e.directionX == -100)
          { x = e.directionX + s.frog.positionX}
        if (e.directionY + s.frog.positionY <=800 && e.directionY == 100)
          {y = e.directionY + s.frog.positionY,
            oneUp -= 10
            }
        if (e.directionY + s.frog.positionY >=0 && e.directionY == -100)
          {
            y = e.directionY + s.frog.positionY
            oneUp += 10
          }
        
        return {...s,
          score: s.score + oneUp,
        frog: {
          height: 100,
          width: 100,
          id: "frog",
          positionX: x,
          positionY: y,
          direction: s.frog.direction
        }
    }}
    
    
    /* Creating a new observable that emits a Tick object every 10 milliseconds. */
    const gameClock = interval(10)
      .pipe(map(elapsed=>new Tick(elapsed)))

     /* Creating a stream of events that are being merged into one stream. */
     const mainStream = merge(moveUpArrow$,moveDownArrow$,moveLeftArrow$,moveRightArrow$,gameClock, spaceButton$).pipe(
     //@ts-ignore
          scan(reduceState, initialState)
        ).subscribe(updateView)
        
      

    
    function updateView(s: State){
      document.getElementById("score")!.innerHTML ="Score = " + String(s.score)
      const
      svg = document.getElementById("svgCanvas")!,
      frog = document.getElementById("frog")!
      
      //console.log(s.frog.positionX, s.frog.positionY)
      frog.setAttribute("x", String(s.frog.positionX) )
      frog.setAttribute("y", String(s.frog.positionY))
      
      /**
       * If the body has an id that matches an id of an element in the svg, then update the position of
       * that element. If the body does not have an id that matches an id of an element in the svg,
       * then create a new element in the svg with the body's id and position
       * @param {Body} b - Body - the body object that is being updated
       */
      const updateBodyView = (b: Body) => {
        /**
         * It creates a rectangle and appends it to the svg element,
         * it also checks what type of object it is to make sure it fills the color properly
         * @returns the object that was created.
         */
        function createBodyView(){
          const obj = document.createElementNS(svg.namespaceURI, "rect")!;
          if (b.id.slice(0,3) == "Car"){
            obj.setAttribute("fill", "#FFFF00")
            obj.setAttribute("id", String(b.id))
          }
          else if (b.id.slice(0,3) == "Log"){
            obj.setAttribute("fill", "#725c42")
            obj.setAttribute("id", String(b.id))
          }
          
          obj.setAttribute("width", String(b.width))
          obj.setAttribute("height", String(b.height))
          obj.setAttribute("x", String(b.positionX))
          obj.setAttribute("y", String(b.positionY))
          svg.appendChild(obj)
          return obj
        }
        
        const obj = document.getElementById(String(b.id)) || createBodyView()
        obj.setAttribute("x", String(b.positionX))
        obj.setAttribute("y", String(b.positionY))
      }

    /* Updating the view of the game. */
      s.logLane1.forEach(updateBodyView)
      svg.appendChild(frog)
      s.lane1.forEach(updateBodyView)

      
      if (s.gameOver == true){
        console.log("collision")
        mainStream.unsubscribe();
        
      const v = document.createElementNS(svg.namespaceURI, "text")!;
     
      v.setAttribute("x", "250")
      v.setAttribute("y", "400")
      v.setAttribute("class", "gameover")
      v.textContent = "Game Over";
      svg.appendChild(v);
      }
      
    }
    /**
     * > It highlights the arrow keys and space bar when they are pressed
     */
    function showKeys() {
      function showKey(k:Key) {
        const arrowKey = document.getElementById(k)!,
          o = (e:Event) => fromEvent<KeyboardEvent>(document,e).pipe(
            filter(({code})=>code === k))
        o('keydown').subscribe(e => arrowKey.classList.add("highlight"))
        o('keyup').subscribe(_=>arrowKey.classList.remove("highlight"))
      }
      showKey('ArrowLeft');
      showKey('ArrowRight');
      showKey('ArrowUp');
      showKey('ArrowDown');
      showKey('Space');
    }
    
    setTimeout(showKeys, 0)
  }
// The following simply runs your main function on window load.  Make sure to leave it in place.
if (typeof window !== "undefined") {
  window.onload = () => {
    main();
  };
}
