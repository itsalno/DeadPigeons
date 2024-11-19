import { useState } from 'react';
import { http } from '../http';
import {CreateBalanceDTO} from "../myApi";

function BalancePage(){
    const [amount, setAmount] = useState(""); // State for the amount
    const [transactionNumber, setTransactionNumber] = useState(""); // State for the transaction number

    
    
    var balanceDto : CreateBalanceDTO ={
        playerId: "e8157541-68ad-4d37-b3b8-7dbd8fe465f1", 
        amount: parseInt(amount),
        transactionType: "Deposit", 
        transactionNerf: transactionNumber, 
        timeStamp: new Date().toISOString(),
        //aa
    }
    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await http.api.balanceCreate(balanceDto)
            console.log('Balance added:', response.data);
        } catch (error) {
            console.error('Error :', error);
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
                <p className="text-3xl mt-4 font-bold text-green-600">DKK Imaginery balance</p>
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

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none">
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