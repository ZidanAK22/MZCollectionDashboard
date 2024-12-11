import { Link } from "@remix-run/react"

export default function CustomNavbar() {
    return (
        <div className="flex flex-row justify-evenly align-middle items-center py-4 mb-2 border-b border-gray-300">
            <div>
                <Link to="/" className="flex flex-row space-x-4">
                    <img src='logo-dark.png' width={64} />
                    <h1 className="font-bold text-2xl">MZCollection</h1>
                </Link>
            </div>
            <nav className="space-x-8">
                <Link to="/dummy">Sales Analytics</Link>                
                <Link to="/products">Products</Link>
            </nav>
        </div>
    )
}