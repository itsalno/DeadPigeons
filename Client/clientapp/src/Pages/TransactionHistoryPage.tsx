import { useEffect, useState } from "react";
import { http } from "../http";
import { useParams } from "react-router-dom";
import { BalanceDTO } from "../myApi";

function TransactionHistoryPage() {


    const {playerId} = useParams();
    const [transactions, setTransactions] = useState<BalanceDTO[]>([]);

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
                                    key={transaction.playerId}
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
        </div>
    );
}

export default TransactionHistoryPage;