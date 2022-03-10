import React from "react";
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
        setInterval(()=>{
            this.abstraction.analogIn.push(1)
            this.processBytes()
        }, 1000)
    }

    public ReadoutMaker(): any {
        return (<h2>dh232 ReadoutMaker</h2>)
    }

    protected processBytes(): any {
    }
}

export {Abstraction, Dh232}