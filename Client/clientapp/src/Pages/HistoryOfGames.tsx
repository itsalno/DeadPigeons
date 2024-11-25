import {useEffect} from "react";
import {http} from '../http';
import {useAtom} from "jotai";
import {GameAtom} from "../Atoms/GameAtom"

function HistoryOfGames(){
    const [games, setGames] = useAtom(GameAtom);

    useEffect(() => {
        http.api.gameGetAllGamesList().then((response) => {
            setGames(response.data);
        }).catch(e => {
            console.log("Failed to Fetch all papers" + e)
        })
    }, [])

    return (
        <div className="w-full mx-auto space-y-12 text-gray-800">
            {/* Header Section */}
            <header className="text-center bg-gray-100 text-gray-800 py-16">
                <h1 className="text-3xl font-bold">History of Games</h1>
                <p className="text-lg mt-2">Review past games and their outcomes.</p>
            </header>

            {/* Games List Section */}
            <section id="games-history" className="bg-white py-12 px-8">
                <h2 className="text-2xl font-semibold text-center">Games History</h2>
                {games.length > 0 ? (
                    <div className="mt-8 max-w-5xl mx-auto space-y-4">
                        {games.map((game) => (
                            <div
                                key={game.id}
                                className="p-6 border border-gray-300 rounded-lg bg-gray-50 shadow-sm"
                            >
                                <p>
                                    <span className="font-medium">Week:</span> {game.week}
                                </p>
                                <p>
                                    <span className="font-medium">Year:</span> {game.year}
                                </p>
                                <p>
                                    <span className="font-medium">Winning Sequence:</span>{" "}
                                    {game.winningseq }
                                </p>
                                <p>
                                    <span className="font-medium">Prize Pool:</span> DKK{" "}
                                    {game.prizepool?.toFixed(2)}
                                </p>
                                <p>
                                    <span className="font-medium">Carryover:</span> DKK{" "}
                                    {game.carryover?.toFixed(2)}
                                </p>
                                <p>
                                    <span className="font-medium">Is Active:</span>{" "}
                                    {game.isactive ? "Yes" : "No"}
                                </p>
                                <p>
                                    <span className="font-medium">Start Date:</span>{" "}
                                    {game.startingDate
                                        ? new Date(game.startingDate).toLocaleDateString()
                                        : "N/A"}
                                </p>
                                <p>
                                    <span className="font-medium">End Date:</span>{" "}
                                    {game.endingDate
                                        ? new Date(game.endingDate).toLocaleDateString()
                                        : "N/A"}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-8">No games history available.</p>
                )}
            </section>

            {/* Footer Section */}
            <footer className="text-center text-gray-500 bg-gray-100 py-6">
                <p>&copy; 2024 Dead Pigeons. All rights reserved.</p>
            </footer>
        </div>
    );
}
export default HistoryOfGames;