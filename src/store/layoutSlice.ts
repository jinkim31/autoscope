import {createAsyncThunk, createSlice, Draft, isFulfilled, PayloadAction} from '@reduxjs/toolkit'
import CommManager from "../model/comm/commManager";
import {SerialPort} from "serialport";
import {log10} from "chart.js/helpers";
import {act} from "react-dom/test-utils";
import commManager from "../model/comm/commManager";

export interface LayoutStateState {
    ports: string[],
}

const initialState: LayoutStateState = {
    ports : []
}

export const commSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        addDh232Callback: (state) => {

        },
    }
})

export const {addDh232Callback} = commSlice.actions
export default commSlice.reducer