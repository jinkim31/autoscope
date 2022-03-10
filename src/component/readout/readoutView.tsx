import React, {useState} from "react";
import ReadoutElement from "./readoutElement";
import './readout.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import ReactModal from "react-modal";
import ReadoutMaker from "../readoutMaker/readoutMaker";

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default function ReadoutView(){

    const [openModal, setOpenModal] = useState(false)

    return(
        <div className={'readout'}>
            <ReactModal style={modalStyles} isOpen={openModal}>
                <ReadoutMaker></ReadoutMaker>
                <button onClick={()=>setOpenModal(false)}>cancel</button>
            </ReactModal>
            <div className={'control'}>
                <label>control</label>
                <button onClick={()=>setOpenModal(true)}>+</button>
            </div>
            <div className={'list'}>
                {/*{useSelector((state: RootState) => state.log.readouts).map((readout, i) => <ReadoutElement key={i} name={readout.name} value={readout.value}/>)}*/}
            </div>
            <div className={'control_bottom'}>
                <div style={{flexGrow:1}}></div>
                <button className={'button_text'}>plot</button>
                <button className={'button_text'}>log</button>
            </div>
        </div>
    )
}
