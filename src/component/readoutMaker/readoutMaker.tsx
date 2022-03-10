import React, {useState} from "react";
import commManager from "../../model/comm/commManager";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

export default function ReadoutMaker()
{
    const [selectedPlugin, setSelectedPlugin] = useState(commManager.plugins[0])

    return(
        <div>
            <h1>add readout</h1>
            <select onChange={(e)=>{setSelectedPlugin(commManager.findPlugin(e.target.value))}} value={selectedPlugin.getName()}>
                {commManager.plugins.map((name, i) => <option key={i} value={name.getName()}>{name.getName()}</option>)}
            </select>
            {selectedPlugin.ReadoutMaker()}
        </div>
    )
}