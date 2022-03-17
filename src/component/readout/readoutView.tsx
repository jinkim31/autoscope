import React, {Fragment, useState} from "react";
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
    const [selectedIndexes, setSelectedIndexes] = useState([])
    const [displayIndex, setDisplayIndex] = useState(0)
    const readouts = useSelector((state: RootState) => state.readout.readouts)

    function onSelectionChanged(checkedIndexes:number[]) {
        console.log(checkedIndexes)
        setSelectedIndexes(checkedIndexes)
        if(checkedIndexes.length==1){
            setDisplayIndex(checkedIndexes[0])
        }
    }

    return(
        <div className={'readout'}>
            <ReactModal style={modalStyles} isOpen={openModal}>
                <ReadoutMaker/>
                <button onClick={()=>setOpenModal(false)}>cancel</button>
            </ReactModal>
            <div className={'control'}>
                <label>Readouts</label>
                <div style={{flexGrow: 1}}/>
                <button className={'button_icon'} onClick={()=>setOpenModal(true)}>
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
            </div>
            <div className={'list'}>
                {
                    readouts.length>0
                    ? <SelectList onCheckChange={(indexes)=>{
                        onSelectionChanged(indexes)
                        }}>
                            {readouts.map((readout, i) => <ReadoutElement key={i} name={readout.name} value={readout.value}/>)}
                    </SelectList>
                    : <div className={'info_text'}>Click&#160; <FontAwesomeIcon icon={faPlus}/> &#160;to add readouts. </div>}
            </div>
            {
                selectedIndexes.length>0 &&
                <div className={'control_bottom'}>
                    {
                        selectedIndexes.length==1 &&
                        <Fragment>
                            <label>{readouts[displayIndex].name}</label>
                            <label>{readouts[displayIndex].description}</label>
                            <div className={'description_box'}>
                                <label>ID</label>
                                <label>{readouts[displayIndex].id}</label>
                                <label>Value</label>
                                <label>{readouts[displayIndex].value}</label>
                            </div>
                        </Fragment>
                    }

                    <button className={'button_text'} style={{width:'100%'}}>plot</button>
                    <button className={'button_text'} style={{width:'100%'}}>log</button>
                    <button className={'button_text'} style={{width:'100%', color:'red'}}>remove</button>
                </div>
            }
        </div>
    )
}
