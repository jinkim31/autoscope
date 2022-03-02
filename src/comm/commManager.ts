import {SerialPort} from "serialport";

export default class CommManager{
    private serial:SerialPort

    constructor() {
    }

    open(portName:string, baudRate:number){
        if(portName=='') return;
        this.serial = new SerialPort({path: portName, baudRate:baudRate, autoOpen:false})
        this.serial.open((err)=>{
            if(err){
                console.log('port open failed. ' + err.message)
                return false
            }
        else{
            console.log('port opened')
            }})

        this.serial.on('error', ()=>{
            console.log('serial error!')
        })

        this.serial.on('data', function (data) {
            console.log('Data:', data)
        })
    }
}