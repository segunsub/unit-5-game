// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var boxes = [];
var ground;

function setup() {
  createCanvas(400, 400);
  engine = Engine.create();
  world = engine.world;
    Engine.run(engine);
    var options = {
    isStatic: true
    }
    ground = Bodies.rectangle(200, height,width,10, options)
    World.add(world, ground)
}
function mousePressed() {
    boxes.push(new Car(mouseX, mouseY, random(10,40), random(10, 40)))
}

function draw() {
    background(51);
    // console.log
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].show();
    }
    noStroke(255)
  fill(170)
    rectMode(CENTER)
   rect(ground.position.x, ground.position.y,width,10)


}






// let engine = Matter.Engine.create();


// let render = Matter.Render.create({
//     element: document.body,
//     engine:engine
// })
//   //first two parameters are the position.
//   //The next two are the width and height.
//   //isStatic property is to make sure the objects don't go through our ground
// let ground = Matter.Bodies.rectangle(400,600,810,60,{ isStatic: true});
// let boxA = Matter.Bodies.rectangle(400,200,80,80);
// let boxB = Matter.Bodies.rectangle(450,50,80,80);

// Matter.world.add(engine.world,[boxA,boxB,ground])
// Matter.Engine.run(engine)
// Matter.Render.run(render)
