let musicid = document.getElementById('musicid')
let text = document.getElementById('toName')
let email = document.getElementById('fromName')
let message = document.getElementById('msg')
let musicslide = document.getElementById('musicslide')
let musichoice = document.getElementById('youtube-audio')
let audio = document.getElementById('player')
const body = document.getElementById('body')
const intro = document.getElementById('intro')
let tank = document.createElement("meter")
let flex = document.getElementById('flex')
tank.id = 'tanks'
let title = document.getElementById('title')
 const buttonstart = document.getElementById('play')
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
 let xbtn = document.createElement('button')
  xbtn.id = "xbtn"
  xbtn.innerText = 'X'
 let send = document.getElementById('formbtn')
 let about = document.getElementById('about')
 let form = document.getElementById('form')
let formcontainer = document.createElement('div')
formcontainer.classList.add('formcontain')
formcontainer.append(xbtn,form)
body.append(formcontainer)
about.addEventListener('click', () => {
 formcontainer.style.display = "block"
})
xbtn.addEventListener('click', () => {
  formcontainer.style.display = "none"
})
send.addEventListener('click', () => {
  text.value = ''
  email.value = ''
  message.value = ''
   formcontainer.style.display = "none"
})
 
musicbtn.addEventListener('click', () => {
  body.append(music)
  audio.innerHTML = ''
  music.innerHTML = '<source src="sound/CarRace.mp3" type="audio/mp3">'
  setInterval(()=>{
    music.volume = musicrange.value
  }, 1000)
 })
 buttonstart.addEventListener("click",buttonstart.requestFullscreen);
 buttonstart.addEventListener('click', () => {
  music.innerHTML = ''
  // body.removeChild(music)
    audio.innerHTML = '<source src="sound/StartCar.mp3" type="audio/mp3">'
   body.removeChild(intro)
   canvas.style.position = "absolute"
   tank.style.position = "absolute"
   instructionbtn.style.position = "absolute"
   audio.volume = 1
 })

let instructionclck = document.createElement('button')
instructionclck.id = "instruction"
flex.append(instructionclck)
let pintro = document.createElement('p')
pintro.innerHTML = `<h1 background-color="gold">Controls</h1>Welcome to Race Game (title is a work in progress, keep this in?) ! Try to reach the end without running out of gas. Good Luck!
 <br>The controls are the arrow keys
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
});

let ptag = document.createElement('p')
ptag.innerHTML = `<h1 class="h1">Controls</h1>
 The controls are the arrow keys
 `
 ptag.classList.add('instruc')


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

musichoice.style.display = "none"
musicid.style.display = "none"
let id = "jZbzeU5NT8c" 
musichoice.dataset.video = id
let choicebtn = document.createElement('button')
choicebtn.id = "choicebtn"
choicebtn.innerText = "▶"
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
instructionbtn.innerText = "Instructions"
body.append(instructionbtn,tank)
instructioncontainer.append(ptag,resume,restart,gamemusic,controlpic)
musicslide.style.display = "none"
gamemusic.addEventListener('click', () => {
  setInterval(()=>{
    music.volume = musicrange.value
  }, 1000)
  musicslide.style.display = "block"
  save.style.backgroundColor = "rgb(103,169,220)"
  save.style.color = "black"
  musicontrol.style.backgroundColor = "rgba(103,169,220, 0.1)"
  musicontrol.style.color = "black"
  musichoice.style.display = "block"
  musicid.style.display = "block"
  musicontrol.append(musichoice,musicid,musicslide,choicebtn,save)
  body.append(musicontrol)
  musicontrol.style.display = "block"
 })
let newid = ''
choicebtn.addEventListener('click', () => {
  let player = document.getElementById('youtube-player')
  newid = musicid.value
  player.src=`https://www.youtube.com/embed/${newid}?autoplay=0&loop=1&enablejsapi=1&origin=http%3A%2F%2F127.0.0.1%3A5501&widgetid=1`
 musicid.value = ''
  
})

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
const newGas = new Gas(8090, screen.height - 100, "../img/gasicon.png");
const newFinish = new FinishLine(window.innerWidth * 20, screen.height - 70, "../img/Finish.png")

const newGame = new Game(newCar, window.innerWidth * 20, 8, newFinish, newGas);

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
}, 1);

let tankmeasure = setInterval(()=>{
  if(newGame.car.gas <= tank.low) {
    tankicon.style.display = "block"
    body.append(tankicon)
  }else {
    tankicon.style.display = "none"
    }
}, 1000)

let fuelDeplete = setInterval(() => {
  tank.value = newGame.car.gas
})

let lowfuel = setInterval(()=>{
  tankicon.style.display = "none"
}, 2000)



//Youtube Api Audio
function onYouTubeIframeAPIReady() {
  var e=document.getElementById("youtube-audio"),
  t=document.createElement("img");t.setAttribute("id","youtube-icon"),
  t.style.cssText="cursor:pointer;cursor:hand",
  e.appendChild(t);
  var a=document.createElement("div");
  a.setAttribute("id","youtube-player"),
  e.appendChild(a);
  var o=function(e){var a=e?"IDzX9gL.png":"quyUPXN.png";
  t.setAttribute("src","https://i.imgur.com/"+a)};
  setInterval(()=>{
    r.setVolume(musicslide.value)
  }, 1000)
  e.onclick=function(){r.getPlayerState()===YT.PlayerState.PLAYING||r.getPlayerState()===YT.PlayerState.BUFFERING?(r.pauseVideo(),o(!1)):(r.playVideo(),o(!0))};

  var r=new YT.Player("youtube-player",{height:"0",width:"0",videoId:e.dataset.video,volume:e.dataset.volume,playerVars:{autoplay:e.dataset.autoplay,loop:e.dataset.loop},events:{onReady:function(e){r.setPlaybackQuality("small"),o(r.getPlayerState()!==YT.PlayerState.CUED)},onStateChange:function(e){e.data===YT.PlayerState.ENDED&&o(!1)}}})
   
}