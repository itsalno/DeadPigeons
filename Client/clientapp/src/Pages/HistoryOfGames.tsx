import {useEffect} from "react";
import {http} from '../http';
import {useAtom} from "jotai";
import {GameAtom} from "../Atoms/GameAtom"
import {useNavigate} from 'react-router-dom';

function HistoryOfGames() {

    const navigate = useNavigate();
    const [games, setGames] = useAtom(GameAtom);

    useEffect(() => {
        http.api.gameGetAllGamesList().then((response) => {
            setGames(response.data);
        }).catch(e => {
            console.log("Failed to Fetch all papers" + e)
        })
    }, [])

    const handleViewDetails = (gameId: string) => {
        navigate(`/game/${gameId}/detailHistory`);
    };


    return (
        <div className="w-full mx-auto space-y-12 text-gray-800">
            {/* Header Section */}
            <header className="text-center bg-red-600 text-white py-16">
                <h1 className="text-4xl font-bold">History of Games</h1>
                <p className="text-lg mt-2">Review past games and their outcomes.</p>
            </header>

            {/* Games List Section */}
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-semibold text-center mb-10">Games History</h2>

                {games.length > 0 ? (
                    <div className="space-y-6">
                        {games.map((game) => (
                            <div
                                key={game.id}
                                className="p-6 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <p>
                                        <span className="font-semibold text-gray-700">Week:</span>{" "}
                                        {game.week}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-gray-700">Year:</span>{" "}
                                        {game.year}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-gray-700">Winning Sequence:</span>{" "}
                                        {game.winningseq || "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-gray-700">Prize Pool:</span>{" "}
                                        DKK {game.prizepool?.toFixed(2)}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-gray-700">Carryover:</span>{" "}
                                        DKK {game.carryover?.toFixed(2)}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-gray-700">Is Active:</span>{" "}
                                        {game.isactive ? "Yes" : "No"}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-gray-700">Start Date:</span>{" "}
                                        {game.startingDate
                                            ? new Date(game.startingDate).toLocaleDateString()
                                            : "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-gray-700">End Date:</span>{" "}
                                        {game.endingDate
                                            ? new Date(game.endingDate).toLocaleDateString()
                                            : "N/A"}
                                    </p>
                                </div>

                                {/* View Details Button */}
                                <div className="mt-4 text-right">
                                    <button
                                        onClick={() => handleViewDetails(game.id || "")}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center mt-10">
                        <p className="text-lg text-gray-500">
                            No games history available at the moment.
                        </p>
                    </div>
                )}
            </div>

            {/* Footer Section */}
            <footer className="text-center text-gray-500 bg-gray-100 py-6">
                <p>&copy; 2024 Dead Pigeons. All rights reserved.</p>
            </footer>
        </div>
    );
}
export default HistoryOfGames;