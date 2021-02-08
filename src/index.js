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

const { Engine, Render, World, Bounds, Bodies, Body, Constraint, Composites, Composite, Events  } = Matter;


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
const trackLength = window.innerWidth * 2;
const finishLine = Composites.pyramid(trackLength - 400, 50, 8, 7, 0, 0, function(x, y) {
  return Bodies.rectangle(x, y, 50, 50);
});

World.add(world, [
  car,
  // walls back and ground
    //ground
  Bodies.rectangle(0 + trackLength/2, window.innerHeight -15, trackLength, 30, { isStatic: true }),
    //start
  Bodies.rectangle(0 + 15, window.innerHeight/2, 60, window.innerHeight, { isStatic: true }),
    // Flage/Finish line
  finishLine
]);

console.log(car);
console.log(finishLine);
Events.on(engine, 'collisionActive', (event) => {
  const carIds = {};
  car.bodies.forEach(element => carIds[element.id] = true);
  const finishLineIds = {};
  finishLine.bodies.forEach(element => finishLineIds[element.id] = true);
  // console.log(event.pairs);
  let pairs = event.pairs.filter(pair => {
    if (carIds[pair.bodyA.id]  || carIds[pair.bodyB.id]) {
      if (finishLineIds[pair.bodyA.id] || finishLineIds[pair.bodyB.id]) {
        pair.bodyA.render.fillStyle = '#03fc2c';
        pair.bodyB.render.fillStyle = '#03fc2c';
        // console.log("You reached the end");
      }
    }
  });
  
  // for (var i = 0; i < pairs.length; i++) {
  //   var pair = pairs[i];
  //   pair.bodyA.render.fillStyle = '#333';
  //   pair.bodyB.render.fillStyle = '#333';
  // }
  // event.pairs.forEach(function(obj){
    
  // });
})


// // get the centre of the viewport
// var viewportCentre = {
//   x: render.options.width * 0.5,
//   y: render.options.height * 0.5
// };

//     // make the world bounds a little bigger than the render bounds
//     world.bounds.min.x = -300;
//     world.bounds.min.y = -300;
//     world.bounds.max.x = 1100;
//     world.bounds.max.y = 900;


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
