import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ConnectionState{
    isOpen : Boolean
}

const initialState: ConnectionState = {
    isOpen : false
}

const connectionSlice = createSlice({
    name: "connectionSlice",
    initialState,
    reducers:{
        openStateChanged(state, action: PayloadAction<Boolean>){
            state.isOpen = action.payload
        }
    }
})

export const {openStateChanged} = connectionSlice.actions;
export default connectionSlice.reducer;