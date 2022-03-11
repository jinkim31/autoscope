export default abstract class Plugin<T>{
    private readCallbacks: {(name:T): void;}[]
    protected abstraction: T
    private name:string;

    static Readout = class<T>{

    }

    constructor(name:string, initialAbstraction: T) {
        this.name = name
        this.abstraction = initialAbstraction
        this.readCallbacks = []
    }

    public abstract ReadoutMaker():any

    protected abstract processBytes():any

    public addReadCallback(readCallback: (abstraction:T)=>void){
        this.readCallbacks.push(readCallback)
    }

    protected invokeCallbacks(){
        this.readCallbacks.forEach(callback => {
            callback(this.abstraction)
        })
    }

    public getName()
    {
        return this.name
    }
}