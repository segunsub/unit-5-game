class Gas {
    constructor(x, y){
        this.position = {
            x: x,
            y: y
        }
        this.gas = this.initGas();
    }

    initGas(){
        this.gas = Bodies.rectangle(this.position.x, this.position.y, 150, 150);
        console.log(this.gas);
        return this.gas;
    }

}