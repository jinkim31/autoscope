import Plugin from "./plugin";

interface Abstraction{
    name: string,
    analogIn: number[],
    digitalIn: boolean[],
    analogOut: number[],
    digitalOut: boolean[]
}

const initialAbstraction : Abstraction = {
    name: "",
    analogIn: [],
    digitalIn: [],
    analogOut: [],
    digitalOut: []
}

class Dh232 extends Plugin<Abstraction>{
    constructor() {
        super('dh232', initialAbstraction);
        setInterval(()=>{this.abstraction.analogIn.push(1)}, 1000)
    }

    protected ReadoutMaker(): any {
    }

    protected processBytes(): any {
    }
}

export {Abstraction, Dh232}