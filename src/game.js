class Game { 
    constructor(car, length = window.innerWidth * 20, hillNum, ...objects){
        this.car = car;
        this.length = length;
        this.objects = objects;
        this.numHills = hillNum;
        this.content = this.initGame();
    }

    initGame(){
        const engine = Engine.create(), world = engine.world;
        const trackLength = this.length;
        
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

        const wall = Bodies.rectangle(0 + 15, screen.height/2, 60, screen.height, { isStatic: true });
        const ground = Bodies.rectangle(0 + trackLength/2, screen.height -15, trackLength, 30, { isStatic: true });        
        const objectMatter = this.objects.map(obj => obj.matter);
        
        World.add(world, [
            this.car,
            ground,
            wall,
            ...objectMatter
        ]);

        let update = setInterval(()=>{
            render.bounds.min.x = 154 - 800 + newCar.car.bodies[0].position.x;
            render.bounds.max.x = 154 - 800 + 2500 + newCar.car.bodies[0].position.x;
            
            // console.log(newCar.car.bodies[0].bounds.min.y)
            render.bounds.min.y = 653 - 1760 + newCar.car.bodies[0].position.y;
            render.bounds.max.y = 653 - 1760 + 1200 + newCar.car.bodies[0].position.y;
        }, 1);

        Events.on(engine, 'collisionActive', (event) => {
            let hit = this.car.checkCollision(event, newGas)
            this.removeItem(hit);
        });

        document.addEventListener('keydown', function(event) {
            this.car.move(event.key);
        });
    }

    genHills(){
        //make hills and push into this.objects array
        function createHill(x,y, length, height){
            const vectors = [];
            for(let i = x; i < x + length; i+=20){
                let vector = Vector.create(i,y - Math.sin(((i-x)/length )* Math.PI) * height)
                vectors.push(vector);
                console.log(vector, Math.sin(((i-x)/length )* Math.PI));
            }
            const hill = Bodies.fromVertices(2000, screen.height - 30, vectors, {isStatic: true});
            return hill;
        }
    }

    removeItem(item){
        this.objects = this.objects.filter(object => {
            return object !== item;
        });
        //use matter remove method
        World.remove(world, item.matter);
    }

    reset(){  
        //Remove everything in the world
        world.bodies.forEach(body => World.remove(world, body));
        this.objects.forEach(obj => World.remove(world,obj.matter));
        this.objects = [];
        World.remove(world, this.car.car);
        
        //Making everything again
        const wall = Bodies.rectangle(0 + 15, screen.height/2, 60, screen.height, { isStatic: true });
        const ground = Bodies.rectangle(0 + trackLength/2, screen.height -15, trackLength, 30, { isStatic: true })
        wall.render.visible = false
        ground.render.visible = true
        this.car = new Car(400, screen.height - 50,"../img/car-body.png", '../img/car-wheel.png');
        this.objects.push(new Gas(8090, screen.height - 70, "../img/gasicon.png"));
        this.objects.push(new FinishLine(trackLength, screen.height - 70, "../img/Finish.png"));
        const objectMatter = this.objects.map(obj => obj.matter);
        //Adding everything back in
        World.add(world, [
            this.car,
            ground,
            wall,
            ...objectMatter
        ]);
    }
}