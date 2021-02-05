
var Engine = Matter.Engine,
  Render = Matter.Render,
  Composites = Matter.Composites,
  Composite = Matter.Composite,
  Mouse = Matter.Mouse,
  World = Matter.World,
  Constraint = Matter.Constraint,
  Bodies = Matter.Bodies,
  Body = Matter.Body;

// create engine
var engine = Engine.create(), world = engine.world;

// create renderer
var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 1900,
    height: 400,
    wireframes: false
  }
});

Engine.run(engine);

Render.run(render);

var car = Composites.car(190, 100, 150, 30, 25);

World.add(world, [
  car,
  // walls back and ground
  Bodies.rectangle(400, 400, 1900, 30, { isStatic: true }),
  Bodies.rectangle(0, 200, 30, 420, { isStatic: true })
]);

document.addEventListener('keydown', function(event) {
  const key = event.key;
  switch (event.key) {
    case "ArrowLeft":
      Body.applyForce( car.bodies[0], {x: car.bodies[0].position.x, y: car.bodies[0].position.y}, {x: -0.5, y: 0});
        break;
    case "ArrowRight":
      Body.applyForce( car.bodies[0], {x: car.bodies[0].position.x, y: car.bodies[0].position.y}, {x: 0.5, y: 0});
        break;
    // case "ArrowUp":
    //     // Up pressed
    //     break;
    // case "ArrowDown":
    //     // Down pressed
    //     break;
}
});
