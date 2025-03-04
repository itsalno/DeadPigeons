import '../CSS/Styles.css';
import {activeGameAtom} from '../Atoms/GameAtom';
import {useAtom} from 'jotai';
import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import {http} from '../http';
import {BalanceAtom} from '../Atoms/BalanceAtom';
import addAuthHeaders from '../AuthHeader';
import { PrizepoolAtom } from '../Atoms/PrizepoolAtom';

export default function GamesPage() {

    const date = new Date();
    const [autoNum, setAutoNum] = useState(0);
    const [autoplay, setAutoplay] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [cost, setCost] = useState<number>(0);
    const [game] = useAtom(activeGameAtom);
    const [seq, setSeq] = useState([]);
    const [balance, setBalance] = useAtom(BalanceAtom);
    const [visualBalance, setVisualBalance] = useState<number>(balance ?? 0);
    const [prizepool,setPrizePool]=useAtom(PrizepoolAtom);
    const week = parseInt(localStorage.getItem('week') || '0', 10);
    const year = parseInt(localStorage.getItem('year') || '0', 10);


    const [isActive, setIsActive] = useState(true);
    const [playerProfileId, setPlayerProfileId] = useState("");

    const storedPlayerProfileId = localStorage.getItem("playerProfileId");

    
    
     
    
    useEffect(() => {
        if (storedPlayerProfileId) {
            setPlayerProfileId(storedPlayerProfileId);
        } else {
            toast.error("Please log in.");
            return;
        }
    }, []);


    const fetchPrizePool = async () => {
        if (!game?.id) {
            console.error("Game ID is undefined.");
            return;
        }

        try {
            const response = await http.api.gamePricepoolByIdDetail(game.id);
            const pricepool: number = response.data;
            setPrizePool(pricepool);
        } catch (error) {
            console.error("Failed to fetch prize pool:", error);
        }
    };
    
    useEffect(() => {
        fetchPrizePool();
    }, [game?.id]);



    useEffect(() => {
        if (playerProfileId) {
            http.api.playerProfileGetBalanceDetail(playerProfileId,{
                headers: addAuthHeaders(),
            })
                .then((response) => {
                    setIsActive(response.data.isactive)
                    setBalance(response.data.balance)
                })
                .catch((error) => {
                    toast.error("Failed to fetch current balance.");
                    console.error(error);
                });
        }
    }, [playerProfileId]);


    
    
    const handleAuto = (event) => {
        setAutoNum(event.currentTarget.value);
       
    }
    
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
        if (date.getDay() >= 5 && date.getHours() >= 17) {
            toast.error("Playing is prohibited after 5pm on Saturdays");
        } else {
            if(autoNum > 0){
                setAutoplay(true);
            }

            const updateGameDto = {
                GameId: game.id,
                Prizepool: cost,
            };
            
            // @ts-ignore
            http.api.gameUpdateUpdate(game.id, updateGameDto,{
                headers: addAuthHeaders(), 
            });

            
            
            try {
                await http.api.boardCreate({
                    playerid: localStorage.getItem("playerProfileId"),
                    gameid: game.id,
                    price: cost,
                    autoplayEnabled: autoplay,
                    createdAt: new Date().toJSON(),
                    sequence: seq.toString(),
                    
                    autoplayStartWeek: week,
                    autoplayWeeksRemaining: autoNum,
                },{headers: addAuthHeaders()});

                const newBalance = visualBalance;
                setBalance(newBalance);

                const playerId = localStorage.getItem("playerProfileId");
                const updatePlayerDto = {
                    playerId: playerId,
                    balance: -cost,
                };

                http.api.playerProfileUpdateUpdate(localStorage.getItem('playerProfileId'), updatePlayerDto,{
                    headers: addAuthHeaders(), 
                });

                fetchPrizePool();
                toast.success("Your board has been saved");

                setSeq([]);
                setCost(0);
                setDisabled(true);
                setAutoplay(false);
                setAutoNum(0);

                const selected = document.querySelectorAll('.selected');
                for (let i = 0; i < selected.length; i++) {
                    selected[i].classList.remove("selected");
                }
            } catch (error) {
                toast.error("An error has occured");
            }
            
        }

    }
    
    
    return (
        <div className="w-full mx-auto space-y-12 text-gray-800">
            {/* Check if Player is Active */}
            {isActive ? (
                <>
                    {/* Game Title Section */}
                    <header className="text-center bg-red-600 text-white py-16">
                        <p className="text-4xl font-bold">
                            Currently playing: Week {week}, {year}
                        </p>
                    </header>


            <div className="balance">
                <p>Balance: <b>{balance} DKK</b></p>
            </div>
            <div className="balance">
                <p>Total prizepool for the game: <b>{prizepool} DKK</b></p>
            </div>

                    {/* Grid Section */}
                    <div className="grid-container" id="grid">
                        {[...Array(16).keys()].map((index) => (
                            <button
                                key={index + 1}
                                id={`id${index + 1}`}
                                className="grid-item"
                                onClick={(e) => handleClick(e)}
                                value={index + 1}>
                                <div>{index + 1}</div>
                            </button>
                        ))}
                    </div>

                    {/* Cost Section */}
                    <div className="cost">
                        <p className="">Cost: <b>{cost} DKK</b></p>
                    </div>

                    {/* Play Button */}
                    <div className="divBtn">
                        <button
                            className="playbtn"
                            disabled={disabled || !game.id}
                            onClick={() => handleBoardSubmit()}>
                            Next
                        </button><br/>
                        <div className="divAuto">
                            <p>Autoplay weeks:</p>
                            <input className="inputAuto" type="number" onChange={(e)=>handleAuto(e)} />
                        </div>

                    </div>
                </>
            ) : (
                // Display if the Player is Inactive
                <div className="text-center bg-gray-100 py-16">
                    <h1 className="text-4xl font-bold text-red-700">Access Denied</h1>
                    <p className="text-lg mt-4 text-gray-600">
                        Your account is currently inactive. Please contact support to reactivate your account.
                    </p>
                </div>
                
                
            )}
        </div>
    );
}
