
const body = document.getElementById('body')
const intro = document.getElementById('intro')
let tank = document.createElement("meter")
tank.id = 'tanks'
const buttonstart = document.getElementById('start')
let instructionbtn = document.createElement('button')
instructionbtn.classList.add('controls')
buttonstart.addEventListener("click",buttonstart.requestFullscreen);



//  const instruction = document.createElement('button')
//  instruction.innerText = "INSTRUCTIONS"
//  intro.append(instruction)
//  intro.append(buttonstart)

 buttonstart.addEventListener('click', () => {
   body.removeChild(intro)
   canvas.style.position = "absolute"
   tank.style.position = "absolute"
   instructionbtn.style.position = "absolute"
 })
//  let introdiv = document.createElement('div')

//  intro.append(introdiv)
//  introdiv.style.backgroundColor = "blue"


let instructionclck = document.createElement('button')
instructionclck.classList.add('controlsz')
instructionclck.innerText = "Instructions"
body.append(instructionclck)
let pintro = document.createElement('p')
pintro.innerHTML = `<h1 class="h1">Controls</h1>
 The controls are the arrow keys
 `
 pintro.classList.add('instruc')
let instructioncontain = document.createElement('div')
instructioncontain.classList.add('container')
let exit = document.createElement('button')
exit.innerText = "Exit"
exit.classList.add('resume')
instructionclck.addEventListener('click', (e) => {
  instructioncontain.style.display = "block"
  body.append(instructioncontain)
  instructioncontain.append(pintro,exit)
})

exit.addEventListener('click', () => {
  instructioncontain.style.display = "none"
})




let ptag = document.createElement('p')
ptag.innerHTML = `<h1 class="h1">Controls</h1>
 The controls are the arrow keys
 `
 ptag.classList.add('instruc')
//  introdiv.append(ptag)


const { Engine, Render, World, Bounds, Bodies, Body, Constraint, Composites, Composite, Events, Vector  } = Matter;

//tank
tank.min = "0"
tank.max = "100"
tank.low = "40"
let instructioncontainer = document.createElement('div')
let tankicon = document.createElement('img')
tankicon.id = 'icon'
tankicon.src = '../img/lowfuel.png'
tank.innerText = "50%"


instructioncontainer.classList.add('container')
let resume = document.createElement('button')
let restart = document.createElement('button')
let controlpic = document.createElement('img')
restart.classList.add('resume')
resume.classList.add('resume')
restart.innerText = "Restart"
resume.innerHTML = `Resume`
controlpic.classList.add('controlpic')
controlpic.src = '../img/control.png'
  // let instructionbtn = document.createElement('button')
  // instructionbtn.classList.add('controls')
instructionbtn.innerText = "Instructions"
body.append(instructionbtn,tank)
instructioncontainer.append(ptag,resume,restart,controlpic)
  // instruction.addEventListener('click', () => {
  //    intro.append(instructioncontainer)
  // })

//Game logic

const engine = Engine.create(), world = engine.world;
const trackLength = window.innerWidth * 20;

const render = Render.create({
    element: document.body,
    engine: engine,
    canvas: canvas,
    options: {
      width: screen.width,
      height: screen.height,
      wireframes: false,
      background: 'url("img/back2.jpg")',
      hasBounds : true,
    }
  });

Engine.run(engine);
Render.run(render);

const newCar = new Car(400, screen.height - 50,"../img/car-body.png", '../img/car-wheel.png')
const newGas = new Gas(8090, screen.height - 70, "../img/gasicon.png");
const newFinish = new FinishLine(window.innerWidth * 20, screen.height - 70, "../img/Finish.png")

const newGame = new Game(newCar, window.innerWidth * 20, 10, newFinish, newGas);

instructionbtn.addEventListener('click', () => {
  newGame.car.canMove = false
  instructioncontainer.style.display = "block"
  body.append(instructioncontainer)
})
resume.addEventListener('click', () => {
  newGame.car.canMove = true
  instructioncontainer.style.display = "none"
})
restart.addEventListener('click', newGame.reset());
let update = setInterval(()=>{
  render.bounds.min.x = 154 - 800 + newGame.car.car.bodies[0].position.x;
  render.bounds.max.x = 154 - 800 + 2500 + newGame.car.car.bodies[0].position.x;
  
  render.bounds.min.y = 653 - 1760 + newGame.car.car.bodies[0].position.y;
  render.bounds.max.y = 653 - 1760 + 1200 + newGame.car.car.bodies[0].position.y;
}, 1);

let tankmeasure = setInterval(()=>{
  if(newGame.car.gas <= tank.low) {
    tankicon.style.display = "block"
    body.append(tankicon)
  }else {
    tankicon.style.display = "none"
    }
  tank.value = newGame.car.gas
}, 1000)

let lowfuel = setInterval(()=>{
  tankicon.style.display = "none"
}, 2000)
