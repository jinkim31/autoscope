import React, {Component, Fragment} from 'react'
const Store = require('electron-store');
import '../../style/flexlayout.scss'
import * as FlexLayout from "flexlayout-react";
import {IJsonModel} from "flexlayout-react";
import ConnectionView from "../connectionView/connectionView";
const ExcelJS = require('exceljs');
import Terminal from '../terminal/terminal'
import './app.scss'
import Plot from "../plot/plot";
import ReadoutView from "../readout/readoutView";

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
        borders: [
            {
                type: "border",
                location: "bottom",
                selected: 0,
                children: [
                    {
                        type: "tab",
                        enableClose: false,
                        name: "Terminal",
                        component: "Terminal",
                    }
                ]
            },
            {
                type: "border",
                location: "left",
                selected: 0,
                children: [
                    {
                        type: "tab",
                        enableClose: false,
                        name: "Devices",
                        component: "",
                    }
                ]
            },
            {
                type: "border",
                location: "right",
                selected: 0,
                children: [
                    {
                        type: "tab",
                        enableClose: false,
                        name: "Readouts",
                        component: "Readout",
                    }
                ]
            },
        ],
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
                            name: "Plot 1",
                            component: "Plot",
                        }
                    ]
                },
            ]
        }
    };

    constructor(props : Props) {
        super(props);
    }

    factory(node : any) {
        const component = node.getComponent();
        if (component === "Terminal") {
            return (<Terminal/>);
        }
        if (component === "ConnectionView") {
            return (<ConnectionView/>);
        }
        if (component === "Plot") {
            return (<Plot/>);
        }
        if (component === "Readout") {
            return (<ReadoutView/>);
        }
    }

    render() {
        return (
            <div className={'app'}>
                <ConnectionView></ConnectionView>
                <FlexLayout.Layout
                    model={FlexLayout.Model.fromJson(this.layout)}
                    factory={this.factory.bind(this)}/>
            </div>
        );
    }
}