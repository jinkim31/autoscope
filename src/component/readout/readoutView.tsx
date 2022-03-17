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

interface ReadoutStrings {
    name:string,
    description:string,
    value:string
    id:string
}


function generateReadoutStrings(){
    const readouts = useSelector((state: RootState) => state.readout.readouts)
    const strings={
        name:'',
        description:'',
        value:'',
        id:'',
    }

    readouts.forEach(readout=>{
        strings.name+=readout.name+' '
        strings.description+=readout.description+' '
        strings.id+=readout.id.toString()+' '
        strings.value+=readout.value.toString()+' '
    })

}

export default function ReadoutView(){

    const [openModal, setOpenModal] = useState(false)
    const [selectedIndexes, setSelectedIndexes] = useState(new Set())

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
                        console.log(checkedIndexes)
                        setSelectedIndexes(checkedIndexes)
                        }}>
                            {readouts.map((readout, i) => <ReadoutElement key={i} name={readout.name} value={readout.value}/>)}
                    </SelectList>
                    : <div className={'info_text'}>Click&#160; <FontAwesomeIcon icon={faPlus}/> &#160;to add readouts. </div>}
            </div>
            {
                selectedIndexes.size>0 &&
                <div className={'control_bottom'}>
                    <label>Name</label>
                    <label>Description</label>
                    <div className={'description_box'}>
                        <label>ID</label>
                        <label>id</label>
                        <label>Value</label>
                        <label>value</label>
                    </div>
                    <button className={'button_text'} style={{width:'100%'}}>plot</button>
                    <button className={'button_text'} style={{width:'100%'}}>log</button>
                    <button className={'button_text'} style={{width:'100%', color:'red'}}>remove</button>
                </div>
            }
        </div>
    )
}
