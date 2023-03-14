import Logo from "@/components/LogoNew";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white flex shadow py-8">
            <div className="flex justify-between items-center mx-auto">
            <div className="flex-auto mx-20 hidden md:block"><Logo size={128} /></div>
                <div className="flex justify-center">
                    <div className="w-full lg:w-1/4 px-4 hidden md:block">
                        <h3 className="text-xl font-bold mb-4">About</h3>
                        <ul className="list-none mb-4">
                            <li className="mb-4">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    About us
                                </a>
                            </li><li className="mb-2">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Contact us
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Careers
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Privacy policy
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Terms of service
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/4 px-4 hidden md:block">
                        <h3 className="text-xl font-bold mb-4">Resources</h3>
                        <ul className="list-none mb-4">
                            <li className="mb-2">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Documentation
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Guides
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    API Reference
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Status
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/4 px-4">
                        <h3 className="text-xl font-bold mb-4">Support</h3>
                        <ul className="list-none mb-4">
                            <li className="mb-2">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Help center
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Contact support
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    System status
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/4 px-4">
                        <h3 className="text-xl font-bold mb-4">Follow us</h3>
                        <ul className="list-none mb-4">
                            <li className="mb-2">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Twitter
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Facebook
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    LinkedIn
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};
