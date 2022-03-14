import {createAsyncThunk, createSlice, Draft, isFulfilled, PayloadAction} from '@reduxjs/toolkit'
import CommManager from "../model/comm/commManager";
import {SerialPort} from "serialport";
import {log10} from "chart.js/helpers";
import {act} from "react-dom/test-utils";
import commManager from "../model/comm/commManager";
import {IJsonModel, Layout, Actions, DockLocation} from "flexlayout-react";

export interface LayoutStateState {
    layout:any
}

const initialState: LayoutStateState = {
    layout:undefined
}

export const commSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        storeLayout: (state, action) => {
            state.layout = action.payload
            action.payload.doAction(Actions.addNode(
                {type:"tab", component:"grid", name:"a grid", id:"5"},
                "1", DockLocation.CENTER, 0));
        },
    }
})

export const {storeLayout} = commSlice.actions
export default commSlice.reducer