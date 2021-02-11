class Car {
    constructor(x, y, body, wheel){
        this.position = {
            x: x,
            y: y,
        };
        this.gas = 100;
        this.textures = {
            body: body,
            wheels: wheel
        };
        this.canMove = true;
        this.car = this.initCar();
    }

    initCar(){
        this.car = Composites.car(this.position.x, this.position.y, 490, 50, 60);
        const carBody = this.car.bodies[0];
        carBody.render.sprite = {
            texture: this.textures.body,
            xOffset: 0.5,
            xScale: 1,
            yOffset: 0.9,
            yScale: 1.3
        }
        
        const carcircle = this.car.bodies[1];
        carcircle.render.sprite.texture = this.textures.wheels;
        const carcircle2 = this.car.bodies[2];
        // carcircle.render.fillStyle = 'transparent';
        // carcircle2.render.fillStyle = 'transparent';
        carcircle2.render.sprite.texture = this.textures.wheels;
        Body.setDensity(this.car.bodies[0], 0.0012)
        return this.car;
    };

    move(eventKey){
        if(this.canMove){
            // console.log(Body);
            if(this.gas > 0){
                this.position = this.car.bodies[0].position;
                this.gas -= .5;
                
                switch (eventKey) {
                case "ArrowLeft":
                    Body.applyForce( this.car.bodies[0], {x: this.car.bodies[0].position.x, y: this.car.bodies[0].position.y}, {x: -0.3, y: 0});
                    break;
                case "ArrowRight":
                    Body.applyForce( this.car.bodies[0], {x: this.car.bodies[0].position.x, y: this.car.bodies[0].position.y}, {x: 0.3, y: 0});
                    break;
                }
            } else {
                console.log("Out of gas");
                //show icon out of gas
            }
        }
    }

    checkCollision(event, target){
            
        const carIds = {};
        this.car.bodies.forEach(element => carIds[element.id] = true);
        // console.log(target);
        if(target.matter.type === "composite"){
            const targetIds = {};
            if(target.bodies){
                target.bodies.forEach(element => targetIds[element.id] = true);
            } else if(target.matter){
                target.matter.bodies.forEach(element => targetIds[element.id] = true);}
    
            let pairs = event.pairs.filter(pair => {
                if (carIds[pair.bodyA.id]  || carIds[pair.bodyB.id]) {
                if (targetIds[pair.bodyA.id] || targetIds[pair.bodyB.id]) {
                    pair.bodyA.render.fillStyle = '#03fc2c';
                    pair.bodyB.render.fillStyle = '#03fc2c';
                    // console.log("You reached the target");
                    return target.collision(this);
                }
                }
            });            
        } else if(target.matter.type === "body") {
            // console.log(event.pairs);
            const targetIds = {};
            targetIds[target.matter.id] = true;
            let pairs = event.pairs.filter(pair => {
                if (carIds[pair.bodyA.id]  || carIds[pair.bodyB.id]) {
                if (targetIds[pair.bodyA.id] || targetIds[pair.bodyB.id]) {
                    pair.bodyA.render.fillStyle = '#03fc2c';
                    pair.bodyB.render.fillStyle = '#03fc2c';
                    // console.log("You reached the target");
                    return target.collision(this);
                }
                }
            }); 
        }
    }
};