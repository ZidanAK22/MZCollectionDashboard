import { Link } from "@remix-run/react"

export default function CustomNavbar() {
    return (
        <div className="flex flex-row bg-coklat-1 justify-evenly align-middle items-center py-8 mb-2 border-b border-gray-300">
            <div>
                <Link to="/" className="flex flex-row space-x-4">                    
                    <h1 className="font-bold text-2xl">MZCollection</h1>
                </Link>
            </div>
            <nav className="space-x-8">
                <Link to="/dummy">Sales Analytics</Link>                                
            </nav>
        </div>
    )
}