import React, {Fragment, useEffect, useRef, useState} from "react";
import {openStateChanged} from "../store/connectionSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {Bar} from "react-chartjs-2";
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default function ConnectionView() {
    const dispatch = useAppDispatch();
    useEffect(()=>{
        console.log('useEffect')
    })
    const isOpen = useAppSelector((state)=> state.connection.isOpen);


    return (
        <Fragment>
            <h1>connection</h1>
            <button>refresh</button>
            <button onClick={()=>dispatch(openStateChanged(!isOpen))}>connect!</button>
            <label>{String(isOpen)}</label>
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
            <label>??</label>
        </Fragment>
    );
}