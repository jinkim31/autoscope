import{configureStore} from "@reduxjs/toolkit"
import commReducer from './commSlice'
import logReducer, {logSlice} from './logSlice'
import readoutReducer from "./readoutSlice"
import layoutReducer from "./layoutSlice"

export const store = configureStore({
    reducer:{
        comm: commReducer,
        log: logReducer,
        readout: readoutReducer,
        layout:layoutReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch