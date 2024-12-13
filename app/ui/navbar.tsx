import { Link } from "@remix-run/react";

export default function CustomNavbar() {
    return (
        <div className="flex flex-row bg-coklat-1 justify-evenly align-middle items-center py-8 mb-2 border-b border-gray-300">
            <div>
                <Link to="/" className="flex flex-row space-x-4">
                    <h1 className="text-[30px] font-bold text-2xl hover:text-gray-600 transition-colors duration-200">MZCollection</h1>
                </Link>
            </div>
            <nav className="text-[30px] space-x-8">
                <Link
                    to="/dummy"
                    className="hover:text-blue-500 transition-transform duration-200 hover:scale-110"
                >
                    Sales Analytics
                </Link>
            </nav>
        </div>
    );
}
