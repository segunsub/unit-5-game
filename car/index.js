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

// const engine = Engine.create();
// const render = Render.create({
//   element: document.getElementById("game-container"),
//   engine: engine,
//   options: {
//     width: 800,
//     height: 600,
//     wireframes: false, // Draw the shapes as solid colors
//     background: "#f4f4f8"
//   }
// });



// // Create a rectangle centered at the top of the screen, (400, 0), with 120px width and 80px height
// const rectangle = Bodies.rectangle(400, 0, 120, 80, { restitution: 0.25, angle: Math.PI / 4 });

// // Create an immovable rectangle at the bottom of the screen that will act as the floor
// const floor = Bodies.rectangle(400, 575, 800, 50, { isStatic: true });

// // Add the newly minted bodies to our physics simulation
// World.add(engine.world, [rectangle, floor]);

// // Kick off the simulation and the render loops
// Engine.run(engine);
// Render.run(render);





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



// for camera experiment
// const viewportCentre = {
//   x: render.options.width * 0.5,
//   y: render.options.height * 0.5
// };
// var star = Matter.Vertices.create(viewportCentre)
// let translate = {x : 0, y : 0}
// Bounds.translate(render.bounds, translate);
