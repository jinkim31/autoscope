import {createAsyncThunk, createSlice, Draft, isFulfilled, PayloadAction} from '@reduxjs/toolkit'
import CommManager from "../model/comm/commManager";
import {act} from "react-dom/test-utils";

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

interface Plot{

}

export interface ReadoutState {
    plugins:string[]
    selectedPlugin:string,
    readouts:Readout[]
}

const initialState: ReadoutState = {
    plugins: [],
    selectedPlugin:CommManager.plugins[0].getName(),
    readouts:[]
}

export const readoutSlice = createSlice({
    name: 'readout',
    initialState,
    reducers: {
        setSelectedPlugin: (state, action) => {
            state.selectedPlugin = action.payload
        },
        refreshPlugin: (state)=>{
            state.plugins = []
            CommManager.plugins.forEach(plugin => state.plugins.push(plugin.getName()))
        },
        addReadout: (state,action)=>{
            const newReadout:Readout = {
                id: action.payload,
                description:'new readout',
                value:false,
                name:'new readout name',
                setCallback:[]
            }
            state.readouts.push(newReadout)
        },
        updateReadout: (state,action)=>{
            const index = state.readouts.findIndex(
                (readout)=>readout.id === action.payload.id
            )
            if(index == -1){
                console.warn('readout with id ' + action.payload.id.toString() + 'seems to be removed.')
            }
            state.readouts[index].value = action.payload.value
        },
        addPlotFromReadout: (state,action)=>{

        },
    }
})

export const {setSelectedPlugin, refreshPlugin, addReadout, updateReadout} = readoutSlice.actions
export default readoutSlice.reducer