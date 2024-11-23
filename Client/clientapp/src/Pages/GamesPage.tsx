import '../CSS/Styles.css';
import {activeGameAtom} from '../Atoms/GameAtom';
import {useAtom} from 'jotai';
import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import {http} from '../http';
import { BalanceAtom } from '../Atoms/BalanceAtom';

export default function GamesPage() {


    const [num, setNum] = useState(0);
    const [disabled, setDisabled] = useState(true);
    const [cost, setCost] = useState<number>(0);
    const [game] = useAtom(activeGameAtom);
    const [seq, setSeq] = useState([]);
    const [balance, setBalance] = useAtom(BalanceAtom);
    const [visualBalance, setVisualBalance] = useState<number>(balance ?? 0);





    const handleClick = (event) => {
        const value = parseInt(event.currentTarget.value);
        if (!event.currentTarget.classList.contains("selected")) {
            if (seq.length >= 8) {
                toast.error("You have already chosen the maximum of numbers.");
                return;
            }
            setSeq([...seq, value]);
            event.currentTarget.classList.add("selected");
        } else {
            setSeq(seq.filter((item) => item !== value));
            event.currentTarget.classList.remove("selected");
        }
    };

    useEffect(() => {
        const newCost = (() => {
            switch (seq.length) {
                case 5:
                    return 20;
                case 6:
                    return 40;
                case 7:
                    return 80;
                case 8:
                    return 160;
                default:
                    return 0;
            }
        })();

        setCost(newCost);
        setDisabled(seq.length < 5 || visualBalance < newCost);
        setVisualBalance((balance ?? 0) - newCost); 
    }, [seq, balance]);

    
    const handleBoardSubmit = async () => {


        console.log("Submitting board...");
        console.log("Game ID:", game.id);
        console.log("Selected Tiles:", seq);
        console.log("Cost:", cost);
        console.log("Balance:", visualBalance);
        
        
        console.log("Game ID:", game.id);
        const newBalance = balance;
        console.log(localStorage.getItem("playerProfileId"));
        console.log(game.id);
        console.log(cost);
        console.log(new Date().toJSON());
        console.log(seq.toString());
        try {
            await http.api.boardCreate({
                playerid: localStorage.getItem("playerProfileId"),
                gameid: game.id,
                price: cost,
                isautoplay: false,
                createdAt: new Date().toJSON(),
                sequence: seq.toString(),
            });

            const newBalance = visualBalance;
            setBalance(newBalance);
            
            const playerId = localStorage.getItem("playerProfileId");
            const updatePlayerDto = {
                playerId: playerId,
                balance: -cost,
            };
            
            http.api.playerProfileUpdateUpdate(localStorage.getItem('playerProfileId'),updatePlayerDto)
            toast.success("Your board has been saved");
            setSeq([]);
            setCost(0);
            setDisabled(true);
            
            const selected = document.querySelectorAll('.selected');
            for (let i = 0; i < selected.length; i++) {
                selected[i].classList.remove("selected");
            }
            
        } catch (error) {
            toast.error("An error has occured");
            console.log(error);
        }


    }
    return (
        <div>
            <div className="gmtitle">
                <p>Currently playing: Week {localStorage.getItem('week')}, {localStorage.getItem('year')}</p>
            </div>

            <div className="balance">
                <p>Balance: <b>{visualBalance} DKK</b></p>
            </div>


            <div className="grid-container" id="grid">
                <button id="id1" className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={1} key={1}>
                    <div>1</div>
                </button>
                <button id="id2" className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={2}>
                    <div>2</div>
                </button>
                <button id="id3" className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={3}>
                    <div>3</div>
                </button>
                <button id="id4" className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={4}>
                    <div>4</div>
                </button>
                <button id="id5" className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={5}>
                    <div>5</div>
                </button>
                <button id="id6" className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={6}>
                    <div>6</div>
                </button>
                <button id="id7" className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={7}>
                    <div>7</div>
                </button>
                <button id="id8" className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={8}>
                    <div>8</div>
                </button>
                <button id="id9" className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={9}>
                    <div>9</div>
                </button>
                <button id="id10" className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={10}>
                    <div>10</div>
                </button>
                <button id="id11" className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={11}>
                    <div>11</div>
                </button>
                <button id="id12" className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={12}>
                    <div>12</div>
                </button>
                <button id="id13" className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={13}>
                    <div>13</div>
                </button>
                <button id="id14" className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={14}>
                    <div>14</div>
                </button>
                <button id="id15" className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={15}>
                    <div>15</div>
                </button>
                <button id="id16" className="grid-item" onClick={(e) => {
                    handleClick(e)
                }} value={16}>
                    <div>16</div>
                </button>

            </div>
            <div className="cost">
                <p className="">Cost: <b>{cost} DKK</b></p>
            </div>
            <div className="divBtn">
                <button className="playbtn" disabled={disabled|| !game.id} onClick={() => handleBoardSubmit()}>Next</button>
            </div>
        </div>
    );
}
