
export function toTwoCounter(){
    let counter = 0;
    this.next = function(){
        return (counter++ % 2 === 0) ? "left" : "right";
    }
}