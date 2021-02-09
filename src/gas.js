class Gas {
    constructor(x, y, texture, amount = 15){
        this.position = {
            x: x,
            y: y
        }
        this.amount = amount;
        this.texture = texture;
        this.matter = this.initGas();
    }

    initGas(){
        console.log(this.texture);
        this.matter = Bodies.rectangle(this.position.x, this.position.y, 150, 150);
        this.matter.render.sprite = {
            texture: this.texture,
            xOffset: 0,
            xScale: .45,
            yOffset: .6,
            yScale: .45
        }
        console.log(this.matter);
        return this.matter;
    }

    collision(obj){
        console.log("here");
        console.log(obj.gas);
        obj.gas += this.amount;
        this.amount = 0;
        console.log(obj.gas);
        return obj;
    }
}