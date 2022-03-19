import {createAsyncThunk, createSlice, Draft, isFulfilled, PayloadAction} from '@reduxjs/toolkit'
import CommManager from "../model/comm/commManager";
import {act} from "react-dom/test-utils";
import {ChartData, ChartOptions} from "chart.js";

interface Plot {
    name: string,
    id: number,
    data: any,
    options: any
}

export interface PlotState {
    plots: { [id: number]: Plot; }
}

const initialState: PlotState = {
    plots: {}
}

export const plotSlice = createSlice({
    name: 'plot',
    initialState,
    reducers: {
        addPlot: (state, action) => {
            const newPlot: Plot = {
                name: 'plotname',
                id: action.payload.id,
                data: {
                    datasets: [
                        {
                            data: [
                                {x: '2020-3-10 23:39:30', y: 1},
                                {x: '2020-3-10 23:39:31', y: 10},
                                {x: '2020-3-10 23:39:32', y: 100},
                                {x: '2020-3-10 23:39:33', y: 10000},
                                {x: '2020-3-10 23:39:34', y: 100000},
                                {x: '2020-3-10 23:39:35', y: 1000000},
                                {x: '2020-3-10 23:39:36', y: 10000000}]
                        }
                    ]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'millisecond'
                            }
                        },
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            position: "bottom"
                        }
                    },
                    maintainAspectRatio: false,

                }
            }

            state.plots[action.payload] = newPlot
            console.log('plot ' + action.payload + ' added.')
        },
        updatePlot: (state, action) => {
            // const index = state.plots.findIndex(
            //     (plot) => plot.id === action.payload.id
            // )
            // if (index == -1) {
            //     console.warn('plot with id ' + action.payload.id.toString() + 'seems to be removed.')
            // }
            //state.plots[index].value = action.payload.value
        },
    }
})

export const {addPlot, updatePlot} = plotSlice.actions
export default plotSlice.reducer