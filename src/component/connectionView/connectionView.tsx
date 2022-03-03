import React, {Fragment, useEffect, useRef, useState} from "react";
import {Bar} from "react-chartjs-2";
import { Chart, registerables } from 'chart.js'
import {SerialPort} from "serialport";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {refreshPorts} from "../../store/commSlice";
import {appendTerminalLog} from "../../store/logSlice";

Chart.register(...registerables)

export default function ConnectionView() {
    const [portList, setPortList] = useState([])
    const [selectedPort, setSelectedPort] = useState('')
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(refreshPorts())
    }, [])
    return (
        <Fragment>
            <h1>connection</h1>
            <button onClick={()=>dispatch(refreshPorts())}>refresh</button>
            <button onClick={()=>dispatch(appendTerminalLog('hello'))}>append</button>
            {/*<button onClick={()=>dispatch(openStateChanged(!isOpen))}>connect!</button>*/}
            <select onChange={(e)=>{setSelectedPort(e.target.value)}} value={selectedPort}>
                {useSelector((state: RootState) => state.comm.ports).map((port, i) => (
                    <option key={i} value={port}>{port}</option>
                ))}
            </select>
            <Bar data={{
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }} height={400} width={1000}></Bar>
        </Fragment>
    );
}