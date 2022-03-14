import React, {useState} from "react";
import ReadoutElement from "./readoutElement";
import './readout.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import ReactModal from "react-modal";
import ReadoutMaker from "../readoutMaker/readoutMaker";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import SelectList from "../list/selectList";

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
};

export default function ReadoutView(){

    const [openModal, setOpenModal] = useState(false)

    const readouts = useSelector((state: RootState) => state.readout.readouts)
    return(
        <div className={'readout'}>
            <ReactModal style={modalStyles} isOpen={openModal}>
                <ReadoutMaker></ReadoutMaker>
                <button onClick={()=>setOpenModal(false)}>cancel</button>
            </ReactModal>
            <div className={'control'}>
                <label>Readouts</label>
                <div style={{flexGrow:1}}></div>
                <button className={'button_icon'} onClick={()=>setOpenModal(true)}>
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
            </div>
            <div className={'list'}>
                {
                    readouts.length>0
                    ? <SelectList onCheckChange={checkedIndexes => {
                        console.log(checkedIndexes)}}>{readouts.map((readout, i) => <ReadoutElement key={i} name={readout.name} value={readout.value}/>)}</SelectList>
                    : <div className={'info_text'}>Click&#160; <FontAwesomeIcon icon={faPlus}/> &#160;to add readouts. </div>}
            </div>
            <div className={'control_bottom'}>
                <div style={{flexGrow:1}}></div>
                <button className={'button_text'}>plot</button>
                <button className={'button_text'}>log</button>
            </div>
        </div>
    )
}
