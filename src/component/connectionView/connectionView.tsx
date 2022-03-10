import React, {Fragment, useEffect, useRef, useState} from "react";
import {Bar} from "react-chartjs-2";
import { Chart, registerables } from 'chart.js'
import {SerialPort} from "serialport";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {refreshPorts} from "../../store/commSlice";
import {appendTerminalLog} from "../../store/logSlice";
import './connectionView.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRotate} from "@fortawesome/free-solid-svg-icons";

Chart.register(...registerables)

export default function ConnectionView() {
    const [portList, setPortList] = useState([])
    const [selectedPort, setSelectedPort] = useState('')
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(refreshPorts())
    }, [])
    return (
        <div className={'connection_view'}>
            <button className={'button_icon'} onClick={()=>dispatch(refreshPorts())}><FontAwesomeIcon icon={faRotate} /></button>
            <select onChange={(e)=>{setSelectedPort(e.target.value)}} value={selectedPort}>
                {useSelector((state: RootState) => state.comm.ports).map((port, i) => (
                    <option key={i} value={port}>{port}</option>
                ))}
            </select>
        </div>
    );
}