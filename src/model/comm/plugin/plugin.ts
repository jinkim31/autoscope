export default abstract class Plugin<T>{
    private readCallbacks: ((name:T)=>void)[]
    protected abstraction: T
    private name:string;

    constructor(name:string, initialAbstraction: T) {
        this.name = name
        this.abstraction = initialAbstraction
    }

    protected abstract ReadoutMaker():any

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