
interface Readout{
    name:string,
    id:number,
    value:any,
    description:string
    setCallback: {(payload:SetCallbackPayload): void;}[]
}

interface SetCallbackPayload{
    id:number,
    value:number
}