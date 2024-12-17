import logo from '../assets/logo.png';

function IntroPage(){

    


    return (
        <div className="w-full mx-auto space-y-16 text-gray-800">
            {/* Header Section */}
            <header className="text-center bg-red-600 text-white py-16 px-4">
                {/* Logo */}
                <img src={logo} alt="Dead Pigeons Logo" className="mx-auto w-32 h-auto mb-6" />
                <h1 className="text-4xl font-extrabold">Welcome to Dead Pigeons</h1>
                <p className="text-lg mt-4">
                    “Dead Pigeons” is a lottery-style game where players guess the winning numbers each week. Test your luck today!
                </p>
            </header>

            {/* Section: Info About the Game */}
            <section id="game-info" className="py-12 px-8 bg-white shadow-md rounded-md mx-4 lg:mx-auto max-w-4xl">
                <h2 className="text-3xl font-semibold text-center mb-4">About the Game</h2>
                <p className="text-base leading-relaxed">
                    At the end of each week, the board administrator draws 3 random numbers as the winning sequence. Each player guesses
                    5–8 numbers to try and match. The prize pool is 70% of the board sales revenue, while the remaining 30% supports the sports facility.
                </p>
            </section>

            {/* Section: Game Rules */}
            <section id="game-rules" className="py-12 px-8 bg-gray-50 shadow-md rounded-md mx-4 lg:mx-auto max-w-4xl">
                <h2 className="text-3xl font-semibold text-center mb-4">Rules of the Game</h2>
                <ul className="text-base space-y-4 list-disc list-inside">
                    <li>Players must submit their numbers before the weekly deadline.</li>
                    <li>No changes can be made to a submitted board.</li>
                    <li>Each player can submit multiple boards to increase their chances.</li>
                    <li>Winning players will be notified via email or phone.</li>
                </ul>
            </section>

            {/* Section: About the Website */}
            <section id="website-info" className="py-12 px-8 bg-white shadow-md rounded-md mx-4 lg:mx-auto max-w-4xl">
                <h2 className="text-3xl font-semibold text-center mb-4">About Our Platform</h2>
                <p className="text-base leading-relaxed">
                    Our platform is designed to provide a seamless experience for lottery enthusiasts. From buying boards to tracking results, we make it easy, fun, and secure for you to enjoy the thrill of the game.
                </p>
            </section>

            {/* Section: Payouts and Prizes */}
            <section id="payouts-prizes" className="py-12 px-8 bg-gray-50 shadow-md rounded-md mx-4 lg:mx-auto max-w-4xl">
                <h2 className="text-3xl font-semibold text-center mb-4">Payouts and Prizes</h2>
                <p className="text-base leading-relaxed">
                    Prizes are distributed as follows: 70% of the revenue is shared among winners based on their matches, and the remaining 30% supports the sports facility. Bonus prizes are occasionally offered for special events.
                </p>
            </section>

            {/* Section: FAQ */}
            <section id="faq" className="py-12 px-8 bg-white shadow-md rounded-md mx-4 lg:mx-auto max-w-4xl">
                <h2 className="text-3xl font-semibold text-center mb-4">Frequently Asked Questions (FAQ)</h2>
                <ul className="space-y-6">
                    <li>
                        <strong>How do I start playing?</strong>
                        <p>Sign up, deposit funds, and place your numbers on the board.</p>
                    </li>
                    <li>
                        <strong>How to deposit?</strong>
                        <p>Deposits can be made using credit cards, bank transfers, or supported payment gateways. Detailed instructions are provided in your account section.</p>
                    </li>
                    <li>
                        <strong>What age should I be to play?</strong>
                        <p>You must be at least 18 years old to participate.</p>
                    </li>
                </ul>
            </section>

            {/* Section: Contact */}
            <section id="contact" className="py-12 px-8 bg-gray-50 shadow-md rounded-md mx-4 lg:mx-auto max-w-4xl">
                <h2 className="text-3xl font-semibold text-center mb-4">Contact Us</h2>
                <p className="text-base text-center mb-6">
                    Have questions? Reach out to us through any of the following channels:
                </p>
                <div className="text-center space-y-2">
                    <p>Email: <a href="mailto:support@example.com" className="text-blue-500 hover:underline">support@example.com</a></p>
                    <p>Phone: <a href="tel:+1234567890" className="text-blue-500 hover:underline">+123 456 7890</a></p>
                    <p>Location: Street, City, Country</p>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="text-center bg-gray-800 text-white py-6">
                <p className="mb-4">&copy; 2024 Dead Pigeons. All rights reserved.</p>
                <div className="flex justify-center space-x-4">
                    <a href="#" className="text-blue-400 hover:text-white">Facebook</a>
                    <a href="#" className="text-blue-400 hover:text-white">Twitter</a>
                    <a href="#" className="text-blue-400 hover:text-white">Instagram</a>
                </div>
            </footer>
        </div>
    );
}


export default IntroPage;