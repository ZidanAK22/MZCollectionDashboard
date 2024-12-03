import { Link } from "@remix-run/react"

export default function CustomNavbar() {
    return (
        <div className="flex flex-row justify-evenly align-middle py-4 mb-2 border-b border-gray-300">
            <div className="flex">
                
                <p className="font-bold">SalesMon</p>
            </div>
            <nav className="space-x-4">                
                <Link to="/dummy">Market Analytics</Link>                
            </nav>
        </div>
    )
}