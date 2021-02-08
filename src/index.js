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
//  let ptag = document.createElement('p')
//  intro.append(introdiv)
//  introdiv.style.backgroundColor = "blue"
//  introdiv.append(ptag)
//  ptag.innerText = "The controls are the arrow keys"
//  instruction.addEventListener('click', () => {
//
// })

document.querySelector("body").addEventListener("click", document.querySelector("body").requestFullscreen);

const { Engine, Render, World, Bounds, Bodies, Body, Constraint, Composites, Composite,  } = Matter;


// // create engine
const engine = Engine.create(), world = engine.world;

// create renderer
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: screen.width,
    height: screen.height,
    wireframes: false,
    background: 'url("img/back2.jpg")',
    hasBounds : true
  }
});

Engine.run(engine);

Render.run(render);

const car = Composites.car(190, 100, 150, 30, 25);


World.add(world, [
  car,
  // walls back and ground
    //ground
  Bodies.rectangle(0 + window.innerWidth/2, window.innerHeight -15, 2*window.innerWidth, 30, { isStatic: true }),
    //start
  Bodies.rectangle(0 + 15, window.innerHeight/2, 60, window.innerHeight, { isStatic: true })

]);


document.addEventListener('keydown', function(event) {
  const key = event.key;
  switch (event.key) {
    case "ArrowLeft":
      Body.applyForce( car.bodies[0], {x: car.bodies[0].position.x, y: car.bodies[0].position.y}, {x: -0.03, y: 0});
        break;
    case "ArrowRight":
      Body.applyForce( car.bodies[0], {x: car.bodies[0].position.x, y: car.bodies[0].position.y}, {x: 0.03, y: 0});
        break;
    // case "ArrowUp":
    //     // Up pressed
    //     break;
    // case "ArrowDown":
    //     // Down pressed
    //     break;
}
});

let update = setInterval(()=>{
  Render.lookAt(render, car.bodies, {
    x: 900,
    y: 400,
  }, true)}, 1);
