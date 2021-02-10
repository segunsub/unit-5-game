
// const body = document.getElementById('body')
// const intro = document.getElementById('intro')
//  const buttonstart = document.createElement('button')
//  const instruction = document.createElement('button')
//  instruction.innerText = "INSTRUCTIONS"
//  intro.append(instruction)
//  buttonstart.innerText = "START GAME"
//  buttonstart.style.position = "center"
//  intro.append(buttonstart)
//  buttonstart.addEventListener('click', () => {
//    body.removeChild(intro)
//    body.append(instruction)
//  })
//  let introdiv = document.createElement('div')

//  intro.append(introdiv)
//  introdiv.style.backgroundColor = "blue"
 
 
//  instruction.addEventListener('click', () => {

// })
let ptag = document.createElement('p')
ptag.innerHTML = `<h1 class="h1">Controls</h1>
 The controls are the arrow keys
 `
 ptag.classList.add('instruc')
//  introdiv.append(ptag)
document.querySelector("body").addEventListener("click", document.querySelector("body").requestFullscreen);

const { Engine, Render, World, Bounds, Bodies, Body, Constraint, Composites, Composite, Events  } = Matter;

// // create engine
const engine = Engine.create(), world = engine.world;
const trackLength = window.innerWidth * 20;
// create renderer
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: screen.width,
    height: screen.height,
    wireframes: false,
    background: 'url("img/back2.jpg")',
    hasBounds : true,
    showCollisions: true,
    showPositions: true,
    showShadows: true,
  }
});

//tank
let tank = document.createElement("meter")
tank.id = 'tanks'
tank.min = "0"
tank.max = "100"
tank.low = "40"
let instructioncontainer = document.createElement('div')
let tankicon = document.createElement('img')
tankicon.id = 'icon'
tankicon.src = '../img/lowfuel.png'


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
  let instructionbtn = document.createElement('button')
  instructionbtn.classList.add('controls')
  instructionbtn.innerText = "Instructions"
  body.append(instructionbtn,tank)
  instructioncontainer.append(ptag,resume,restart,controlpic)

console.log(render)

Engine.run(engine);

Render.run(render);
const underground = Bodies.rectangle(trackLength/2, screen.height + 890, trackLength + 40, 200, { isStatic: true })

const wall = Bodies.rectangle(0 + 15, screen.height/2, 60, screen.height, { isStatic: true });
const ground = Bodies.rectangle(0 + trackLength/2, screen.height -15, trackLength, 30, { isStatic: true })
wall.render.visible = false
ground.render.visible = true
const newCar = new Car(400, screen.height - 50,"../img/car-body.png", '../img/car-wheel.png')
const newGas = new Gas(8090, screen.height - 70, "../img/gasicon.png");
console.log(newGas);
const newFinish = new FinishLine(trackLength, screen.height - 70, "../img/Finish.png");
// const newGame = new Game(newCar, window.innerWidth * 20, newGas);

World.add(world, [
  newGas.matter,
  newCar.car,
  underground,
  // walls back and ground
    //ground
  ground,
    //start
  wall,
    // Flage/Finish line
  newFinish.matter
  // finishLine
]);

underground.render.sprite = {
  texture: "../img/undergroundtexture.png",
  xScale: 40, yScale: 6.3, xOffset: 0.5, yOffset: 0.5
}
Events.on(engine, 'collisionActive', (event) => {
  newCar.checkCollision(event, newGas)
  newCar.checkCollision(event, newFinish);
});
let bool = true
document.addEventListener('keydown', function(event) {
  const key = event.key;
  if(bool) {
  newCar.move(key);
  }
});
instructionbtn.addEventListener('click', (e) => {
  bool = false
  instructioncontainer.style.display = "block"
  body.append(instructioncontainer)
})
resume.addEventListener('click', (e) => {
  bool = true
  instructioncontainer.style.display = "none"
})
const initialWorldBounds = {
  max : {
    x: 1366,
    y: 780
  },
  min : {
    x: 0,
    y: 0
  }
}

let update = setInterval(()=>{
  render.bounds.min.x = 154 - 800 + newCar.car.bodies[0].position.x;
  render.bounds.max.x = 154 - 800 + 2500 + newCar.car.bodies[0].position.x;
  
  // console.log(newCar.car.bodies[0].bounds.min.y)
  render.bounds.min.y = 653 - 1760 + newCar.car.bodies[0].position.y;
  render.bounds.max.y = 653 - 1760 + 1200 + newCar.car.bodies[0].position.y;
}, 1);

console.log(render);
console.log(wall)
let tankmeasure = setInterval(()=>{
  if(newCar.gas <= tank.low) {
    tankicon.style.display = "block"
    body.append(tankicon)
  }else {
    tankicon.style.display = "none"
    }
  tank.value = newCar.gas
}, 1000)
let lowfuel = setInterval(()=>{
  tankicon.style.display = "none"
}, 2000)