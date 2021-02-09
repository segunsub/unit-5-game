class Gas {
    constructor(x, y, texture, amount = 30){
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
        obj.gas = 100;
        this.amount = 0;
        // this.matter.render.sprite = {
        //     texture: this.texture,
        //     xOffset: 0,
        //     xScale: 0,
        //     yOffset: 0,
        //     yScale: 0
        // }
        World.remove(world, this.matter);
        console.log(this.matter);
        return this;
    }
}