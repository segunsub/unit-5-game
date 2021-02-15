class Game { 
    constructor(car, length = window.innerWidth * 20, hillNum, ...objects){
        this.car = car;
        this.length = length;
        this.objects = objects;
        this.numHills = hillNum;
        this.content = this.initGame();
    }

    initGame(){

        const wall = Bodies.rectangle(0 + 15, screen.height/2, 60, screen.height, { isStatic: true });
        const ground = Bodies.rectangle(0 + trackLength/2, screen.height -15, trackLength, 30, { isStatic: true });
        const underground = Bodies.rectangle(trackLength/2, screen.height + 890, trackLength + 40, 200, { isStatic: true });
        ground.render.visible = true;
        wall.render.visible = false;
        underground.render.sprite = {
            texture: "../img/undergroundtexture.png",
            xScale: 40, yScale: 6.3, xOffset: 0.5, yOffset: 0.5
        }
        const objectMatter = this.objects.map(obj => obj.matter);
        this.genHills().forEach(hill => {
            objectMatter.push(hill);
            // console.log(hill.position);
        });
        
        World.add(world, [
            this.car.car,
            ground,
            wall,
            underground,
            ...objectMatter
        ]);

        Events.on(engine, 'collisionActive', (event) => {
            newGame.objects.forEach(obj => newGame.car.checkCollision(event, obj));
        });

        document.addEventListener('keydown', function(event) {
            // debugger;
            // console.log(newGame.car.canMove);
            if (newGame.car.canMove) {
                newGame.car.move(event.key);
            }
        });

        return world;
    }

    genHills(){
        //make hills and push into this.objects array
        function createHill(x,y, length, height){
            const vectors = [];
            for(let i = x; i < x + length; i+=20){
                let vector;
                if(i + 20 >= x + length){
                    vector = Vector.create(i,y);
                } else {
                    vector = Vector.create(i,y - Math.sin(((i-x)/length )* Math.PI) * height);
                }
                vectors.push(vector);
            }
            const hill = Bodies.fromVertices(x,y, vectors, {isStatic: true});
            return hill;
        }
        const hills = [];
        for(let i = 0; i < this.numHills; i++){
            const hillWidth = Math.floor(((this.length - 4000)/this.numHills));
            const hillHeight = Math.floor(Math.random() * 400 + 100);
            const hill = createHill(5000 + ((hillWidth) * i), screen.height - ((hillHeight - 50)/2), hillWidth, hillHeight)
            //
            console.log(hill.position);
            hills.push(hill);
        }
        return hills;
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
        const ground = Bodies.rectangle(0 + trackLength/2, screen.height -15, trackLength, 30, { isStatic: true });
        const underground = Bodies.rectangle(trackLength/2, screen.height + 890, trackLength + 40, 200, { isStatic: true });
        ground.render.visible = true;
        wall.render.visible = false;
        underground.render.sprite = {
            texture: "../img/undergroundtexture.png",
            xScale: 40, yScale: 6.3, xOffset: 0.5, yOffset: 0.5
        }
        this.car = new Car(400, screen.height - 50,"../img/car-body.png", '../img/car-wheel.png');
        this.objects.push(new Gas(8090, screen.height - 70, "../img/gasicon.png"));
        this.objects.push(new FinishLine(trackLength, screen.height - 70, "../img/Finish.png"));
        const objectMatter = this.objects.map(obj => obj.matter);
        console.log(objectMatter);

        //Adding everything back in
        World.add(world, [
            this.car.car,
            ground,
            wall,
            underground,
            ...objectMatter
        ]);
    }
}