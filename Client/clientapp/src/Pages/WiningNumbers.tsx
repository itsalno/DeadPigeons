import {useState} from 'react';
import { http } from '../http';
import {activeGameAtom} from '../Atoms/GameAtom';
import {useAtom} from 'jotai';
import toast from 'react-hot-toast';


function WiningNumbers() {
    const [winingNum, setWiningNum] = useState([]);
    const [game]= useAtom(activeGameAtom);
    const [isDisabled, setIsDisabled] = useState(false);

    const handleClick = (num) => {
        if (winingNum.length < 3 && !winingNum.includes(num)) {
            setWiningNum([...winingNum, num]);
        }
    };

    const handleReset = () => {
        setWiningNum([]); 
    };

    const handleWinners = () => {
        setIsDisabled(true);
        try {
            http.api.winnerProcessWinnersCreate(game.id);
        } catch (error) {
            toast.error('Error processing winners!');
            setIsDisabled(false);
        }
    };

    const EndGame = () => {
        if (winingNum.length === 3) {
            http.api.gameEndGamePartialUpdate({id: game.id, finalSequence: winingNum.toString()})
            setWiningNum([]);
            toast.success("Winning sequence set succsesfuly")
            
            
        } else {
            toast.error("Error in setting a winning sequence")
        }
    };
    

    return (
        <div className="w-full mx-auto space-y-12 text-gray-800">
            {/* Game Title Section */}
            <header className="text-center bg-red-600 text-white py-16">
                <p className="text-4xl font-bold">
                    Currently playing: Week {localStorage.getItem('week')}, {localStorage.getItem('year')}
                </p>
            </header>

            {/* Balance Display Section */}
            <section id="balance-info" className="bg-white py-12 px-6 text-center">
                <p className="text-2xl font-semibold">
                    Winning Numbers:{" "}
                    <b className="text-green-600 text-3xl">
                        {winingNum.length > 0 ? winingNum.join('-') : "None"}
                    </b>
                </p>
            </section>

            {/* Grid Section */}
            <section id="number-grid" className="grid grid-cols-4 gap-4 max-w-4xl mx-auto py-8">
                {[...Array(16).keys()].map((num) => (
                    <button
                        key={num + 1}
                        className={`grid-item bg-white border border-gray-300 rounded-lg p-4 text-lg font-semibold 
                        ${winingNum.includes(num + 1) ? 'bg-red-300' : 'hover:bg-red-300'} focus:outline-none focus:ring focus:ring-red-500`}
                        onClick={() => handleClick(num + 1)}
                    >
                        {num + 1}
                    </button>
                ))}
            </section>

            {/* Action Button Section */}
            <section id="action-button" className="text-center flex justify-center space-x-4">
                {/* Next Button */}
                <button
                    className="bg-blue-500 text-white py-2 px-6 rounded-lg text-xl font-semibold hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    disabled={winingNum.length !== 3}
                    onClick={EndGame}
                >
                    Next
                </button>

                {/* Reset Button */}
                <button
                    className="bg-blue-500 text-white py-2 px-6 rounded-lg text-xl font-semibold hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    onClick={handleReset}
                >
                    Reset
                </button>
                <button onClick={handleWinners}
                        disabled={isDisabled} 
                        className={`py-2 px-6 rounded-lg text-xl font-semibold text-white focus:outline-none 
                ${isDisabled
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-500 hover:bg-blue-600 focus:ring focus:ring-blue-300"
                        }`}>
                    Determine Winners</button>
            </section>
            {/* Footer Section */}
            <footer className="text-center text-gray-500 bg-gray-100 py-6">
                <p>&copy; 2024 Dead Pigeons. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default WiningNumbers;