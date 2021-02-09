class FinishLine {
    constructor(x,y,texture){
        this.position = {
            x: x,
            y: y,
        }
        this.texture = texture
        this.matter = initFinish();
    }

    initFinish(){
        this.matter = Composites.pyramid(trackLength - 400, 50, 8, 7, 0, 0, function(x, y) {
            return Bodies.rectangle(x, y, 50, 50);
        });
        return this.matter;
    }
}