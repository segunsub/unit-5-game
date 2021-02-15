class FinishLine {
    constructor(x,y,texture){
        this.position = {
            x: x,
            y: y,
        }
        this.texture = texture
        this.matter = this.initFinish();
    }

    initFinish(){
        this.matter = Bodies.rectangle(this.position.x, this.position.y, 150, 1000, { isStatic: true });
        // this.matter.forEach(element => {
        //     Body.setDensity(element, .0000001);
        // });
        this.matter.render.sprite = {
            texture: this.texture,
            xOffset: 0.5,
            xScale: 1,
            yOffset: 0.9,
            yScale: 1.3
        }
        return this.matter;
    }

    collision(obj){
        console.log("you reached the end");
        alert("Win Win Win :)")
        //implement pause/restart/next level
    }
}