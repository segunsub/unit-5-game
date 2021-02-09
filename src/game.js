class Game { 
    constructor(car, length = window.innerWidth * 20, ...objects){
        this.car = car;
        this.length = length;
        this.objects = objects;
        this.content = this.initGame();
    }

    initGame(){
        const engine = Engine.create(), world = engine.world;
        const trackLength = this.length;
        
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

        Engine.run(engine);
        Render.run(render);

        const camcircle = Bodies.circle(400, 88, 5)

        const camline = Bodies.rectangle(0 + trackLength/2, 190, trackLength, 20, { isStatic: true,render: { opacity: 0.5 }})
        Body.setDensity(camcircle, 2.2);

        const wall = Bodies.rectangle(0 + 15, screen.height/2, 60, screen.height, { isStatic: true });
        const ground = Bodies.rectangle(0 + trackLength/2, screen.height -15, trackLength, 30, { isStatic: true })
        
        World.add(world, [
            this.car,
            camcircle,
            camline,
            ground,
            wall,
            ...this.objects
        ]);

        Events.on(engine, 'collisionActive', (event) => {
            let hit = this.car.checkCollision(event, newGas)
            this.removeItem(hit);
        });

        document.addEventListener('keydown', function(event) {
            this.car.move(event.key);
        });
    }

    removeItem(item){
        this.objects = this.objects.filter(object => {
            return object !== item;
        });
        //use matter remove method
    }
}