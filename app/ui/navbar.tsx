import { Link } from "@remix-run/react";
import styles from "../styles/navbar.module.css"

export default function CustomNavbar() {
    return (
        <div className="flex flex-row bg-coklat-1 justify-evenly align-middle items-center py-8 mb-2 border-b border-gray-300">
            <div>
                <Link to="/" className="flex flex-row space-x-4">
                    <h1 className="font-bold text-3xl hover:text-gray-600 transition-colors duration-200">MZCollection</h1>
                </Link>
            </div>
            <nav className="text-3xl space-x-8">
                <Link
                    to="/dummy"
                    className={styles.hoverEffect}
                >
                    Sales Analytics
                </Link>
                <Link to="/showcase" className={styles.hoverEffect}>
                    About Us
                </Link>
            </nav>
        </div>
    );
}
