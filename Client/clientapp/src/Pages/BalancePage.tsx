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
        <div className="w-full mx-auto space-y-12 text-gray-800">
            {/* Header Section */}
            <header className="text-center bg-gray-100 text-gray-800 py-16">
                <h1 className="text-3xl font-bold">Your Balance</h1>
                <p className="text-lg mt-2">Keep track of your balance and add funds easily.</p>
            </header>

            {/* Balance Display Section */}
            <section id="balance-info" className="bg-white py-12 px-8 text-center">
                <h2 className="text-2xl font-semibold">Current Balance</h2>
                <p className="text-3xl mt-4 font-bold text-green-600">
                    {balance !== null ? `DKK ${balance}` : "Loading..."}
                </p>
            </section>

            {/* Form to Add Funds */}
            <section id="add-funds" className="bg-gray-50 py-12 px-8">
                <h2 className="text-2xl font-semibold text-center">Add Funds to Your Balance</h2>

                <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto space-y-6">
                    <div>
                        <label className="block text-lg font-medium">Amount to Add</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full mt-2 border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium">Upload Payment Confirmation</label>
                        <input
                            type="text"
                            value={transactionNumber}
                            onChange={(e) => setTransactionNumber(e.target.value)}
                            placeholder="Enter Transaction Number"
                            className="w-full mt-2 border border-gray-300 rounded p-2"
                        />
                    </div>

                    <button type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none">
                        Add Funds
                    </button>
                </form>
            </section>

            {/* Footer Section */}
            <footer className="text-center text-gray-500 bg-gray-100 py-6">
                <p>&copy; 2024 Dead Pigeons. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default BalancePage;