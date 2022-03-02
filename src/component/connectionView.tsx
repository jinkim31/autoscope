import React, {Fragment, useEffect, useRef, useState} from "react";
import {Bar} from "react-chartjs-2";
import { Chart, registerables } from 'chart.js'
import {SerialPort} from "serialport";
import {useDispatch, useSelector} from "react-redux";
import {counterSlice, decrement, increment} from "../store/counterSlice";
import {RootState} from "../store/store";
import CommManager from '../comm/commManager'

Chart.register(...registerables)

export default function ConnectionView() {
    const [portList, setPortList] = useState([])
    const [selectedPort, setSelectedPort] = useState('')
    const commManager:React.MutableRefObject<CommManager> = useRef(new CommManager())
    const dispatch = useDispatch()

    function refreshPort(){
        SerialPort.list().then(function(ports){
            let newPortList:string[] = []
            ports.forEach(function(port){
                newPortList = [...newPortList, port.path]
                setSelectedPort(port.path)
            })
            setPortList(newPortList)
        });
    }

    function openPort()
    {
        console.log('opening port:'+selectedPort)
        commManager.current.open(selectedPort, 9600)
    }
    return (
        <Fragment>
            <h1>connection</h1>
            <button onClick={refreshPort}>refresh</button>
            {/*<button onClick={()=>dispatch(openStateChanged(!isOpen))}>connect!</button>*/}
            <button onClick={openPort}>open</button>
            <button onClick={()=>dispatch(increment())}>+</button>
            <button onClick={()=>dispatch(decrement())}>-</button>
            <label>{useSelector((state: RootState) => state.counter.value)}</label>
            <select onChange={(e)=>{setSelectedPort(e.target.value)}} value={selectedPort}>
                {portList.map((port, i) => (
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