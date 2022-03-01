import React, {Component} from 'react'
const Store = require('electron-store');
import './style/flexlayout.css'
import * as FlexLayout from "flexlayout-react";

const store = new Store();

store.set('unicorn', '🦄');
console.log(store.get('unicorn'));

import {SerialPort} from 'serialport'
SerialPort.list().then(function(ports){
    ports.forEach(function(port){
        console.log("Port: ", port);
    })
});

var json = {
    global: {
        tabEnableClose:false,
        tabEnableFloat:true,
        splitterSize: 1,
        splitterExtra: 8},
    borders: [],
    layout: {
        type: "row",
        weight: 100,
        children: [
            {
                type: "tabset",
                weight: 30,
                children: [
                    {
                        type: "tab",
                        name: "One",
                        component: "text",
                    }
                ]
            },
            {
                type: "tabset",
                weight: 50,
                children: [
                    {
                        type: "tab",
                        name: "Two",
                        component: "text",
                    }
                ]
            }
        ]
    }
};

SerialPort.list().then(function(ports){
    ports.forEach(function(port){
        console.log("Port: ", port);
    })
});

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {model: FlexLayout.Model.fromJson(json)};
    }

    factory(node) {
        var component = node.getComponent();
        if (component === "text") {
            return (<div className="panel">Panel {node.getName()}</div>);
        }
    }

    render() {
        return (
                <FlexLayout.Layout
                    model={this.state.model}
                    factory={this.factory.bind(this)}
                    realtimeResize={true}/>
        );
    }
}