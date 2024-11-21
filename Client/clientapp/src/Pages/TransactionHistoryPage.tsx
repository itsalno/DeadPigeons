import { useEffect, useState } from "react";
import { http } from "../http";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import {TransactionsAtom } from "../Atoms/TransactionsAtom";

function TransactionHistoryPage() {
    
    
    const { playerId } = useParams();
    const [transactions, setTransactions] = useAtom(TransactionsAtom);

    console.log(playerId);
    useEffect(() => {
        http.api.balanceDetail(playerId)
            .then((response) => {
                setTransactions(response.data); 
            })
            .catch((error) => {
                console.error("Failed to fetch transactions", error);
            });
    }, [playerId, setTransactions]);
    

    return (
        <div className="w-full mx-auto space-y-12 text-gray-800">
            {/* Header Section */}
            <header className="text-center bg-gray-100 text-gray-800 py-16">
                <h1 className="text-3xl font-bold">Transaction History</h1>
                <p className="text-lg mt-2">View all transactions for the selected player.</p>
            </header>

            {/* Transactions Section */}
            <section className="bg-gray-50 py-12 px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-semibold text-center mb-8">Transaction History</h2>
                    <div className="space-y-4">
                        {transactions.length > 0 ? (
                            transactions.map((transaction) => (
                                <div key={transaction.playerId}
                                     className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
                                    <p><strong>Amount:</strong> ${transaction.amount}</p>
                                    <p><strong>Type:</strong> {transaction.transactionType}</p>
                                    <p><strong>Type:</strong> {transaction.transactionRef}</p>
                                    <p><strong>Date:</strong> {(transaction.timeStamp)}</p>
                                </div>
                            ))
                        ) : (
                            <p>No transactions available for this player.</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default TransactionHistoryPage;