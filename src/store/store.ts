import{configureStore} from "@reduxjs/toolkit";
import commReducer from './commSlice'
import logReducer, {logSlice} from './logSlice'

export const store = configureStore({
    reducer:{
        comm: commReducer,
        log: logReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch