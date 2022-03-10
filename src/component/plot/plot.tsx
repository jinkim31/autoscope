import React from "react";
import {Line} from 'react-chartjs-2'
import './plot.scss'
import {faFileExport, faGear} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'chartjs-adapter-moment'

export default function Plot(){
    // @ts-ignore
    return(
        <div className={'plot'}>
            <div className={'controls'}>
                <label>PlotName</label>
                <div style={{flexGrow: 1}}></div>
                <button className={'button_icon'}><FontAwesomeIcon icon={faGear}/></button>
                <button className={'button_icon'}><FontAwesomeIcon icon={faFileExport} /></button>
            </div>
            <div className={'line_container'}>
                <Line
                    datasetIdKey='id'
                    data={{
                        datasets: [
                            {data: [{x:'2020-3-10 23:39:30', y:1},
                                    {x:'2020-3-10 23:39:31', y:10},
                                    {x:'2020-3-10 23:39:32', y:100},
                                    {x:'2020-3-10 23:39:33', y:10000},
                                    {x:'2020-3-10 23:39:34', y:100000},
                                    {x:'2020-3-10 23:39:35', y:1000000},
                                    {x:'2020-3-10 23:39:36', y:10000000}]}
                        ]
                    }}

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