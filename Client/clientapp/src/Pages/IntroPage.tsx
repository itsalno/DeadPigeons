function IntroPage(){



    return (
        <div className="w-full mx-auto space-y-12 text-gray-800">
            {/* Header Section */}
            <header className="text-center bg-gray-100 text-gray-800 py-16">
                <h1 className="text-3xl font-bold">Welcome to Dead Pigeons</h1>
                <p className="text-lg mt-2">
                    .....
                </p>
            </header>

            {/* Section: Info bout the game */}
            <section id="game-info" className="bg-white py-12 px-8">
                <h2 className="text-2xl font-semibold">About the Game</h2>
                <p className="text-base mt-4 max-w-3xl">
                   ....
                </p>
            </section>

            {/* Section: Game Rules */}
            <section id="game-rules" className="bg-gray-50 py-12 px-8">
                <h2 className="text-2xl font-semibold">Rules of the Game</h2>
                <ul className="mt-4 text-base list-disc list-inside max-w-3xl space-y-2">
                    .....
                </ul>
            </section>

            {/* Section: About the Website */}
            <section id="website-info" className="bg-white py-12 px-8">
                <h2 className="text-2xl font-semibold">About Our Platform</h2>
                <p className="text-base mt-4 max-w-3xl">
                    .......
                </p>
            </section>

            {/* Section: Payouts and Prizes */}
            <section id="payouts-prizes" className="bg-gray-50 py-12 px-8">
                <h2 className="text-2xl font-semibold">Payouts and Prizes</h2>
                <p className="text-base mt-4 max-w-3xl">
                   .......
                </p>
            </section>

            {/* Section: FAQ */}
            <section id="faq" className="bg-white py-12 px-8">
                <h2 className="text-2xl font-semibold">Frequently Asked Questions (FAQ)</h2>
                <ul className="mt-4 text-base max-w-3xl space-y-4">
                    <li><strong>How do I start playing?</strong> <br /> Sign up, deposit funds, and dive in!</li>
                    <li><strong>How to deposit?</strong> <br /> ......</li>
                    <li><strong>What age should I be to play?</strong> <br /> You must be over 18.</li>
                </ul>
            </section>

            {/* Section: Contact */}
            <section id="contact" className="bg-gray-50 py-12 px-8">
                <h2 className="text-2xl font-semibold">Contact Us</h2>
                <p className="text-base mt-4">
                    Need help? Reach out through any of the following methods:
                </p>
                <address className="mt-4 text-base space-y-2">
                    <p>Email: <a href="mailto:support@example.com" className="text-blue-500 hover:underline">support@example.com</a></p>SAME SHI
                    <p>Phone: <a href="tel:+1234567890" className="text-blue-500 hover:underline">PHONE NUMBER HERE</a></p>NEED TO GET EXACT ONE FROM STAKEHOLDER
                    <p>Location: Street, City, Country</p>EXACT FROM STAKEHOLDER
                </address>
            </section>

            {/* Footer Section */}
            <footer className="text-center text-gray-500 bg-gray-100 py-6">
                <p>&copy; 2024 Dead Pigeons. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default IntroPage;