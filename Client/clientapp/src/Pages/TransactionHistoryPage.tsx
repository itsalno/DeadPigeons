import { useEffect, useState } from "react";
import { http } from "../http";
import { useParams } from "react-router-dom";
import { BalanceDTO } from "../myApi";
import toast from 'react-hot-toast';
import addAuthHeaders from "../AuthHeader";
import { useAtom } from 'jotai';
import { BalanceAtom } from '../Atoms/BalanceAtom';

function TransactionHistoryPage() {

    const [approvedAmounts, setApprovedAmounts] = useState<number[]>([]);
    const {playerId} = useParams();
    const [transactions, setTransactions] = useState<BalanceDTO[]>([]);
    const [pendingTransactions, setPendingTransactions] = useState<BalanceDTO[]>([]);
    const [, setBalance] = useAtom(BalanceAtom);





    useEffect(() => {
        if (playerId) {
            http.api.playerProfileGetBalanceDetail(playerId,{
                headers: addAuthHeaders(),
            })
                .then((response) => {
                    setBalance(response.data.balance);
                    
                })
                .catch((error) => {
                    toast.error("Failed to fetch current balance.");
                    console.error(error);
                });
        }
    }, [playerId]);
    
    useEffect(() => {
        http.api.balanceAllDetail(playerId,{
            headers: addAuthHeaders(), 
        })
            .then((response) => {
                setTransactions(response.data as BalanceDTO[]);
            })
            .catch((error) => {
                console.error("Failed to fetch transactions", error);
            });

        
        http.api.balancePendingDetail(playerId,{
            headers: addAuthHeaders(),  
        })
            .then((response) => {
                setPendingTransactions(response.data as BalanceDTO[]);
            })
            .catch((error) => {
                console.error("Failed to fetch pending transactions", error);
            });
    }, [playerId]);


    const handleApprove = async (transactionId: string) => {
        const transaction = pendingTransactions.find((t) => t.id === transactionId); 
        if (!transaction) return;

        if (!transaction.playerId) {
            console.error("Player ID is undefined or null");
            return;
        }

        try {
            const updatePlayerDto = {
                playerId: transaction.playerId,
                balance: parseInt(transaction.amount.toString()), // Ensure amount is an integer
            };
            
            await http.api.playerProfileUpdateUpdate(transaction.playerId, updatePlayerDto,{
                headers: addAuthHeaders(), 
            });
            await http.api.balanceApproveTransactionPartialUpdate({id : transactionId},{
                headers: addAuthHeaders(), 
            })

            setPendingTransactions((prev) => prev.filter((transaction) => transaction.id !== transactionId));
            setTransactions((prev) => [...prev, transaction]);
          
            
            toast.success("Successfully replenished the player's balance");
        } catch (error) {
            console.error("Failed to approve transaction or update balance", error);
            toast.error("Something went wrong. Please try again.");
        }
    };


    const handleDecline = async (transactionId: string) => {
        const transaction = pendingTransactions.find((t) => t.id === transactionId);
        if (!transaction) return;

        if (!transaction.playerId) {
            console.error("Player ID is undefined or null");
            return;
        }

        try {
            await http.api.balanceRejectTransactionPartialUpdate({id: transactionId},{
                headers: addAuthHeaders(), 
            });
            
            setPendingTransactions((prev) => prev.filter((transaction) => transaction.id !== transactionId));
            toast.success("Successfully rejected a transaction");
            
        } catch (error) {
            console.error("Failed to reject transaction", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="w-full mx-auto space-y-12 text-gray-800">
            {/* Header Section */}
            <header className="text-center bg-red-600 text-white py-16">
                <h1 className="text-4xl font-bold">Transaction History</h1>
                <p className="text-lg mt-2">
                    View all transactions for the selected player. Keep track of their activity.
                </p>
            </header>

            {/* Transactions Section */}
            <section className="bg-gray-50 py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-semibold text-center mb-12">Transaction Details</h2>

                    <div className="space-y-6">
                        {transactions.length > 0 ? (
                            transactions.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className="bg-white border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                                >
                                    <p className="text-lg font-semibold text-gray-700">
                                        Amount: <span className="text-green-600">{transaction.amount} DKK</span>
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        <strong>Type:</strong> {transaction.transactionType}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        <strong>Reference:</strong> {transaction.transactionRef}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        <strong>Date:</strong> {transaction.timeStamp}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white border rounded-lg shadow-md p-6 text-center">
                                <p className="text-lg font-semibold text-gray-500">
                                    No transactions available for this player.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Pending Transactions Section */}
            <section className="bg-gray-100 py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-semibold text-center mb-12">Pending Transactions</h2>

                    <div className="space-y-6">
                        {pendingTransactions.length > 0 ? (
                            pendingTransactions.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className="bg-white border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                                >
                                    <p className="text-lg font-semibold text-gray-700">
                                        Amount: <span className="text-yellow-600">{transaction.amount} DKK</span>
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        <strong>Type:</strong> {transaction.transactionType}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        <strong>Reference:</strong> {transaction.transactionRef}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        <strong>Date:</strong> {transaction.timeStamp}
                                    </p>
                                    <div className="flex space-x-4 mt-4">
                                        <button
                                            onClick={() => transaction.id && handleApprove(transaction.id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => transaction.id && handleDecline(transaction.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white border rounded-lg shadow-md p-6 text-center">
                                <p className="text-lg font-semibold text-gray-500">
                                    No pending transactions available for this player.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default TransactionHistoryPage;