import React, {useEffect} from "react";
import {Line} from 'react-chartjs-2'
import './plot.scss'
import {faFileExport, faGear} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'chartjs-adapter-moment'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {log10} from "chart.js/helpers";
import {refreshPorts} from "../../store/commSlice";
import {addPlot} from "../../store/plotSlice";

interface Props{
    id:number
}

export default function Plot(props:Props){

    const dispatch = useDispatch()

    useEffect(()=>{
        console.log('adding plot')
        dispatch(addPlot(123))
    }, [])

    return(
        <div className={'plot'}>
            <div className={'controls'}>
                <label>{props.id}</label>
                <div style={{flexGrow: 1}}></div>
                <button className={'button_icon'}><FontAwesomeIcon icon={faGear}/></button>
                <button className={'button_icon'}><FontAwesomeIcon icon={faFileExport} /></button>
            </div>
            <div className={'line_container'}>
                <Line
                    datasetIdKey='id'
                    data={useSelector((state: RootState) => state.plot.plots[props.id]).data}

                    options={{
                        scales:{
                            x:{
                                type: 'time',
                                time:{
                                    unit: 'millisecond'
                                }
                            },
                            y:{
                                beginAtZero: true
                            }
                        },
                        plugins:{
                            legend:{
                                position: "bottom"
                            }
                        },
                        maintainAspectRatio: false,

                    }}
                />
            </div>
        </div>

    )
}