import {useAtom} from "jotai/index";
import {WinnerAtom} from "../Atoms/WinnerAtom"
import { useEffect } from "react";
import { http } from '../http';
import addAuthHeaders from "../AuthHeader";

function WinnersPage() {

    const [winner, setWinner] = useAtom(WinnerAtom);
    
    useEffect(() => {
        http.api.winnerGetAllWinnersList({
            headers: addAuthHeaders(), 
        }).then((response) => {
            setWinner(response.data);
        }).catch(e => {
            console.error("Failed to fetch winners data", e);
        })
    }, []);


    return (
        <div className="relative w-full mx-auto space-y-12 text-gray-800">
            {/* Background Animation: Floating Stars */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/path-to-your-stars-image.png')] bg-cover bg-fixed animate-fadeInStars z-0"></div>

            {/* Main Content Container */}
            <div className="relative z-10 w-full mx-auto space-y-12">
                {/* Header Section with Gold and Fun Vibes */}
                <header className="text-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white py-16 shadow-xl rounded-b-xl transform scale-105">
                    <h1 className="text-5xl font-extrabold tracking-wider text-shadow-md animate__animated animate__fadeIn">Winners</h1>
                    <p className="text-lg mt-2 max-w-2xl mx-auto font-medium">
                        Shine like gold! Celebrate the champions with all their glory. 🏆✨
                    </p>
                </header>

                {/* Winners Section */}
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-semibold text-center mb-12 text-gray-700">Winner Profiles</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        
                        {winner.map((w) => (
                            <div
                                key={w.createdAt} // You can use any unique identifier
                                className="bg-white border border-gray-200 rounded-lg shadow-xl p-6 flex flex-col justify-between hover:shadow-2xl hover:bg-yellow-50 transition-shadow duration-300 ease-in-out transform hover:scale-105 animate__animated animate__fadeInUp"
                            >
                                {/* Winner Info */}
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-700 text-shadow-md">{w.name} {w.surname}</h3>
                                    <p className="text-sm text-gray-500">{w.email}</p>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-lg font-semibold text-gray-800">
                                        <span className="text-yellow-500">Phone:</span> {w.phone}
                                    </p>
                                    <p className="text-lg font-semibold text-gray-800">
                                        <span className="text-yellow-500">Sequence:</span> {w.sequence}
                                    </p>
                                    <p className="text-lg font-semibold text-gray-800">
                                        <span className="text-yellow-500">Winning amount:</span>{w.amountWon}
                                    </p>
                                    <p className="text-lg font-semibold text-gray-800">
                                        <span
                                            className="text-yellow-500">Date:</span> {new Date(w.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                {/* Fun Trophy Icon */}
                                <div className="text-center mt-4">
                                    <span role="img" aria-label="trophy" className="text-4xl text-yellow-500 animate__animated animate__bounceIn">
                                        🏆
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Section */}
                <footer className="text-center text-gray-500 bg-gray-100 py-6">
                    <p>&copy; 2024 Dead Pigeons. All rights reserved. 🏅</p>
                </footer>
            </div>
        </div>
    );
}
export default WinnersPage;