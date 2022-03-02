import React, {Component} from 'react'
const Store = require('electron-store');
import '../style/flexlayout.css'
import * as FlexLayout from "flexlayout-react";
import {SerialPort} from 'serialport'
import {IJsonModel} from "flexlayout-react";
import ConnectionView from "./connectionView";
const ExcelJS = require('exceljs');


const store = new Store();
store.set('unicorn', '🦄');
console.log(store.get('unicorn'));

interface Props{

}

interface State{
    model:FlexLayout.Model
}

export default class App extends Component {
    private layout: IJsonModel = {
        global: {
            tabEnableClose: false,
            tabEnableFloat: true,
            splitterSize: 1,
            splitterExtra: 8
        },
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
                            component: "test",
                        }
                    ]
                }
            ]
        }
    };

    constructor(props : Props) {
        super(props);
    }

    factory(node : any) {
        const component = node.getComponent();
        if (component === "text") {
            return (<div className="panel">Panel {node.getName()}</div>);
        }
        if (component === "test") {
            return (<ConnectionView></ConnectionView>);
        }
    }

    render() {
        return (
                <FlexLayout.Layout
                    model={FlexLayout.Model.fromJson(this.layout)}
                    factory={this.factory.bind(this)}
                    realtimeResize={true}/>
        );
    }
}