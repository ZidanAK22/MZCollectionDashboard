import { Link } from "@remix-run/react"

export default function CustomNavbar() {
    return (
        <div className="flex flex-row justify-evenly align-middle items-center py-4 mb-2 border-b border-gray-300">
            <div className="flex">
                <Link to="/">
                    <h1 className="font-bold text-2xl">SalesMon</h1>
                </Link>            
            </div>
            <nav className="space-x-4">                
                <Link to="/dummy">Market Analytics</Link>                
            </nav>
        </div>
    )
}