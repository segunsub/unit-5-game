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
        this.car = null;
    }

    initCar(){
        this.car = Composites.car(190, 100, 150, 30, 25);
        this.car.bodies.forEach(element => {
            element.render.fillStyle = 'transparent';
        });
    };

    move(eventKey){
        switch (eventKey) {
          case "ArrowLeft":
            Body.applyForce( this.car.bodies[0], {x: this.car.bodies[0].position.x, y: this.car.bodies[0].position.y}, {x: -0.03, y: 0});
              break;
          case "ArrowRight":
            Body.applyForce( this.car.bodies[0], {x: this.car.bodies[0].position.x, y: this.car.bodies[0].position.y}, {x: 0.03, y: 0});
              break;
        }
    };
};