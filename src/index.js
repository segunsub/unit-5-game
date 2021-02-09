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
    hasBounds : true
  }
});

Engine.run(engine);

Render.run(render);
const camcircle = Bodies.circle(400, 188, 5)
// const carBodynew = Bodies.rectangle(230, 640, 200, 90);
const car = Composites.car(400, screen.height -50, 490, 50, 60);
const carBody = car.bodies[0];
carBody.render.sprite = {
  texture: "../img/car-body.png",
  xOffset: 0.5,
  xScale: 1,
  yOffset: 0.9,
  yScale: 1.3
}

const carcircle = car.bodies[1];
carcircle.render.sprite.texture = '../img/car-wheel.png';
const carcircle2 = car.bodies[2];
carcircle.render.fillStyle = 'transparent';
carcircle2.render.fillStyle = 'transparent';

carcircle2.render.sprite.texture = '../img/car-wheel.png';
// car.bodies.push(carBody);
// Composite.add(car, Constraint.create({
//   bodyA: carBody,
//   bodyB: camcircle,
//   length: 825,
//   render: {
//     visible: true
//   },
//   stiffness: 0.8
// }))


const camline = Bodies.rectangle(0 + trackLength/2, 190, trackLength, 20, { isStatic: true,render: { opacity: 0.5 }})
Body.setDensity(camcircle, 2.2);
// camline.render.setOpacity(0);
// camline.bodies.forEach(el => el.render.fillStyle = 'transparent');
const finishLine = Composites.pyramid(trackLength - 400, 50, 8, 7, 0, 0, function(x, y) {
  return Bodies.rectangle(x, y, 50, 50);
});
const wall = Bodies.rectangle(0 + 15, screen.height/2, 60, screen.height, { isStatic: true });


const newCar = new Car(400, screen.height - 70,"../img/car-body.png", '../img/car-wheel.png')
console.log(newCar);
World.add(world, [
  newCar.car,
  car,camcircle,
  camline,
  // walls back and ground
    //ground
  Bodies.rectangle(0 + trackLength/2, screen.height -15, trackLength, 30, { isStatic: true }),
    //start
  wall,
    // Flage/Finish line
  // finishLine
]);

console.log(car);
console.log(finishLine);
console.log(wall);
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
    // world.bounds.min.x = -300;
    // world.bounds.min.y = -300;
    // world.bounds.max.x = 1100;
    // world.bounds.max.y = 900;


document.addEventListener('keydown', function(event) {
  const key = event.key;
  newCar.move(key);
  switch (event.key) {
    case "ArrowLeft":
      Body.applyForce( car.bodies[0], {x: car.bodies[0].position.x, y: car.bodies[0].position.y}, {x: -0.3, y: 0});
      Body.applyForce( camcircle, {x: camcircle.position.x, y: camcircle.position.y}, {x: -0.83, y: 0})
      break;
    case "ArrowRight":
      Body.applyForce( car.bodies[0], {x: car.bodies[0].position.x, y: car.bodies[0].position.y}, {x: 0.3, y: 0});
      Body.applyForce( camcircle, {x: camcircle.position.x, y: camcircle.position.y}, {x: 0.83, y: 0});
        
      break;
    // case "ArrowUp":
    //     // Up pressed
    //     break;
    // case "ArrowDown":
    //     // Down pressed
    //     break;
}
});

// let update = setInterval(()=>{
//   // camcircle.position.x = car.bodies[0].position.x + 800
//   Render.lookAt(render, camcircle, {
//     x: 400,
//     y: 900,
//   }, false)}, 1);
let update = setInterval(()=>{
Render.lookAt(render, newCar.car.bodies[0], {
  x: 400,
  y: 700,
}, false)}, 1);
