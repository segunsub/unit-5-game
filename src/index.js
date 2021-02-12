let audio = document.getElementById('player')
const body = document.getElementById('body')
const intro = document.getElementById('intro')
let tank = document.createElement("meter")
tank.id = 'tanks'
let title = document.getElementById('title')
 const buttonstart = document.getElementById('start')
 let instructionbtn = document.createElement('button')
 instructionbtn.classList.add('controls')
 let music = document.createElement('audio')
 let musicbtn = document.getElementById('music')
 let musicontrol = document.createElement('div')
 musicontrol.id = 'musicontrol'
 musicontrol.innerHTML = `<h1>Volume Control</h1>`
 let musicrange = document.getElementById('myRange')
 let save = document.createElement('button')
save.style.color = "gold"
save.innerText = "Save"
save.classList.add('resume')
 musicontrol.append(musicrange,save)
 musicbtn.addEventListener('click', () => {
  save.style.backgroundColor = "black"
  body.append(musicontrol)
  musicontrol.style.display = "block"
 })
 save.addEventListener('click', () => {
  musicontrol.style.display = "none"
 })
 music.id = 'play'
 music.autoplay = 'true'
 window.onload = () => {
   console.log('working')

 }

 
musicbtn.addEventListener('click', () => {
  body.append(music)
  audio.innerHTML = ''
  music.innerHTML = '<source src="sound/melodyloops-preview-badass-life-2m30s.mp3" type="audio/mp3">'
  setInterval(()=>{
    music.volume = musicrange.value
  }, 1000)
 })
 buttonstart.addEventListener("click",buttonstart.requestFullscreen);

//  const instruction = document.createElement('button')
//  instruction.innerText = "INSTRUCTIONS"
//  intro.append(instruction)
//  intro.append(buttonstart)
console.log('audio')
 buttonstart.addEventListener('click', () => {
  music.innerHTML = ''
  // body.removeChild(music)
    audio.innerHTML = '<source src="sound/StartCar.mp3" type="audio/mp3">'
   body.removeChild(intro)
   canvas.style.position = "absolute"
   tank.style.position = "absolute"
   instructionbtn.style.position = "absolute"
  //  song.src = "sound/StartCar.mp3"
   audio.volume = 1
  // body.append(music)
 })
//  let introdiv = document.createElement('div')

//  intro.append(introdiv)
//  introdiv.style.backgroundColor = "blue"


let instructionclck = document.createElement('button')
instructionclck.classList.add('controlsz')
instructionclck.innerText = "Instructions"
body.append(instructionclck)
let pintro = document.createElement('p')
pintro.innerHTML = `<h1 background-color="gold">Controls</h1>
 The controls are the arrow keys
 `
 pintro.classList.add('instruc')
let instructioncontain = document.createElement('div')
instructioncontain.classList.add('containers')
let exit = document.createElement('button')
exit.style.color = "gold"
exit.style.backgroundColor = "black"
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
let gamemusic = document.createElement('button')
let restart = document.createElement('button')
let controlpic = document.createElement('img')
restart.classList.add('resume')
gamemusic.classList.add('resume')
resume.classList.add('resume')
restart.innerText = "Restart"
resume.innerHTML = `Resume`
gamemusic.innerText = "Music"
controlpic.classList.add('controlpic')
controlpic.src = '../img/control.png'
  // let instructionbtn = document.createElement('button')
  // instructionbtn.classList.add('controls')
instructionbtn.innerText = "Instructions"
body.append(instructionbtn,tank)
instructioncontainer.append(ptag,resume,restart,gamemusic,controlpic)
gamemusic.addEventListener('click', () => {
  save.style.backgroundColor = "rgb(103,169,220)"
  save.style.color = "black"
  musicontrol.style.backgroundColor = "rgb(103,169,220)"
  musicontrol.style.color = "black"
  body.append(musicontrol)
  musicontrol.style.display = "block"
 })
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
restart.addEventListener('click', newGame.reset);
let update = setInterval(()=>{
  render.bounds.min.x = 154 - 800 + newGame.car.car.bodies[0].position.x;
  render.bounds.max.x = 154 - 800 + 2500 + newGame.car.car.bodies[0].position.x;
  
  // console.log(newCar.car.bodies[0].bounds.min.y)
  // render.bounds.min.y = 653 - 1760 + newCar.car.bodies[0].position.y;
  // render.bounds.max.y = 653 - 1760 + 1200 + newCar.car.bodies[0].position.y;
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
