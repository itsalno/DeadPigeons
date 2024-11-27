import {useEffect, useState } from 'react';
import { http } from '../http';
import {CreateBalanceDTO} from "../myApi";
import toast from 'react-hot-toast';
import { useAtom } from 'jotai';
import { BalanceAtom } from '../Atoms/BalanceAtom';

function BalancePage(){
    const [amount, setAmount] = useState(""); 
    const [transactionNumber, setTransactionNumber] = useState("");
    const [playerProfileId, setPlayerProfileId] = useState("");
    const [balance, setBalance] = useAtom(BalanceAtom);


    useEffect(() => {
        const storedPlayerProfileId = localStorage.getItem("playerProfileId");

        if (storedPlayerProfileId) {
            setPlayerProfileId(storedPlayerProfileId);
        } else {
            toast.error("Please log in.");
            return; 
        }
    }, []); 

    useEffect(() => {
        if (playerProfileId) { 
            http.api.playerProfileGetByIdDetail(playerProfileId)
                .then((response) => {
                    setBalance(response.data.balance);
                })
                .catch((error) => {
                    toast.error("Failed to fetch current balance.");
                    console.error(error);
                });
        }
    }, [playerProfileId]);
    
    
    
        
    
    var balanceDto : CreateBalanceDTO ={
        playerId: playerProfileId, 
        amount: parseInt(amount),
        transactionType: "Deposit", 
        transactionNerf: transactionNumber, 
        timeStamp: new Date().toISOString(),
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!playerProfileId) {
            toast.error("Please log in.");
            return;
        }

        if (!amount || !transactionNumber) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            await http.api.balanceCreate(balanceDto);
            const updatePlayerDto = {
                playerId: playerProfileId,
                balance: parseInt(amount), 
            };
            await http.api.playerProfileUpdateUpdate(playerProfileId, updatePlayerDto);
            window.location.reload();
            toast.success("Successfully replenished your balance");
        } catch (error) {
            toast.error("Couldn't make the operation, please try again.");
        }
        
        setAmount("");
        setTransactionNumber("");
    };



    return (
        <div className="w-full mx-auto space-y-16 text-gray-800">
            {/* Header Section */}
            <header className="text-center bg-red-600 text-white py-16">
                <h1 className="text-4xl font-bold">Your Balance</h1>
                <p className="text-lg mt-4">
                    Easily track your balance and add funds securely.
                </p>
            </header>

            {/* Balance Display Section */}
                <div className="bg-white shadow-md rounded-md p-6 max-w-lg mx-auto text-center">
                    <h2 className="text-2xl font-semibold">Current Balance</h2>
                    <p className="text-4xl mt-4 font-bold text-green-600">
                        {balance !== null ? `DKK ${balance}` : "Loading..."}
                    </p>
                </div>

            {/* Form to Add Funds */}
                <div className="max-w-lg mx-auto bg-white shadow-md rounded-md p-6">
                    <h2 className="text-2xl font-semibold text-center">Add Funds to Your Balance</h2>
                    <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
                        {/* Amount Input */}
                        <div>
                            <label className="block text-lg font-medium mb-2">Amount to Add</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount"
                                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Transaction Number Input */}
                        <div>
                            <label className="block text-lg font-medium mb-2">Upload Payment Confirmation</label>
                            <input
                                type="text"
                                value={transactionNumber}
                                onChange={(e) => setTransactionNumber(e.target.value)}
                                placeholder="Enter Transaction Number"
                                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 focus:outline-none transition">
                            Add Funds
                        </button>
                    </form>
                </div>

            {/* Footer Section */}
            <footer className="text-center bg-gray-800 text-white py-6">
                <p>&copy; 2024 Dead Pigeons. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default BalancePage;