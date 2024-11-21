import '../CSS/Styles.css';
import {activeGameAtom} from '../Atoms/GameAtom';
import {useAtom} from 'jotai';
import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import { isLoggedInAtom } from '../Atoms/AuthAtom';
import { useNavigate } from 'react-router-dom';

export default function GamesPage() {
    const navigate = useNavigate();
    const [isLoggedIn] = useAtom(isLoggedInAtom);
    if(!isLoggedIn) {
       navigate('/LogIn'); 
    }
    
    const [num, setNum] = useState(0);
    
    const [disabled, setDisabled] = useState(true);
    const [cost, setCost] = useState<number>(0);
    const [game] = useAtom(activeGameAtom);
    const [seq, setSeq] = useState([]);
    const handleClick = (event) => {
        //if(event.currentTarget.disabled != true){
            seq.push(event.currentTarget.value);
            setNum(seq.length);
            if (seq.length > 8) {
                toast.error("You have already chosen the maximum of numbers.")
                console.log("Max numbers");
            } else {
                console.log(seq);
                //console.log(event.currentTarget.value);
                event.currentTarget.disabled = true;
                console.log('button clicked');
            }
        //}
        /* doesn't work because disabled buttons cant be pressed
        else{
            for(var i = 0; i < seq.length; i++){
                if(seq.indexOf(event.currentTarget.value) == i){
                    seq.splice(i, 1);
                    event.currentTarget.disabled = false;
                }
                
            }
        }*/
        
        /*
        const handleReset = (event) => {}
         */
    }
    useEffect(() => {
        console.log(seq.length);
        switch(true) {
            case (num==5):
                setCost(20);
                setDisabled(false);
                break;
            case (num==6):
                setCost(40);
                break;
            case (num==7):
                setCost(80);
                break;
            case (num==8):
                setCost(160);
        }
    }, [num]);

    return (
        <div>
            <div className="gmtitle">
                <p>Currently playing: Week {localStorage.getItem('week')}, {localStorage.getItem('year')}</p>
            </div>

            <div className="balance">
                <p>Balance: <b>0 DKK</b></p>
            </div>


            <div className="grid-container">
                <button className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={1} key={1}>
                    <div>1</div>
                </button>
                <button className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={2}>
                    <div>2</div>
                </button>
                <button className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={3}>
                    <div>3</div>
                </button>
                <button className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={4}>
                    <div>4</div>
                </button>
                <button className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={5}>
                    <div>5</div>
                </button>
                <button className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={6}>
                    <div>6</div>
                </button>
                <button className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={7}>
                    <div>7</div>
                </button>
                <button className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={8}>
                    <div>8</div>
                </button>
                <button className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={9}>
                    <div>9</div>
                </button>
                <button className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={10}>
                    <div>10</div>
                </button>
                <button className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={11}>
                    <div>11</div>
                </button>
                <button className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={12}>
                    <div>12</div>
                </button>
                <button className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={13}>
                    <div>13</div>
                </button>
                <button className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={14}>
                    <div>14</div>
                </button>
                <button className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={15}>
                    <div>15</div>
                </button>
                <button className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={16}>
                    <div>16</div>
                </button>

            </div>
            <div className="cost">
                <p className="">Cost: <b>{cost} DKK</b></p>
            </div>
            <div className="divBtn" >
                <button className="playbtn" disabled={disabled}>Next</button>
            </div>
        </div>
    );
}
