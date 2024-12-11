import { useLoaderData } from "@remix-run/react";
import { Line, Pie, Bar, Doughnut } from "react-chartjs-2";
import { useState } from "react";
import { getAnalytics, mockDb } from "~/utils/mock/dummyagain";
import type { MetaFunction } from "@remix-run/node";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    BarElement
);

export const loader = getAnalytics;

export default function Dashboard() {
    const { globalsales, salesbytype, monthlyTrends, platformDistribution, feedbackDistribution } =
        useLoaderData<typeof loader>();

    // State to manage the selected month
    const [selectedMonth, setSelectedMonth] = useState<string>(monthlyTrends[0].month);
    const [isAsideVisible, setIsAsideVisible] = useState(false);

    // Get data for the selected month
    const selectedMonthData = monthlyTrends.find((entry) => entry.month === selectedMonth);

    return (
        <div className="flex flex-col h-full items-center mt-4 mb-12 w-full">
            <h1 className="text-4xl font-bold text-center">
                E-Commerce Business{" "}
                <span className="italic bg-gradient-to-br from-primary to-secondary text-transparent bg-clip-text">
                    Analytics
                </span>{" "}
                Dashboard
            </h1>

            <div className={`flex relative w-full`}>
                <main className={`flex-grow bg-secondary dark:bg-transparent border rounded-lg mx-4 lg:mx-24 xl:mx-48 mt-4 p-8 space-y-8 transition-transform duration-300 ${isAsideVisible ? "transform translate-x-[-8rem]" : "transform translate-x-0"}`}>
                    <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
                        <div className="bg-white rounded-md col-span-2 lg:col-span-3 max-h-[50vh] min-h-fit min-w-fit flex justify-center py-4">
                            <Line
                                data={globalsales}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { position: "top" },
                                        title: { display: true, text: "Global Sales Over Time" },
                                    },
                                }}
                            />
                        </div>
                        <div className="bg-white rounded-md col-span-1 lg:col-span-2 max-h-[50vh] min-h-fit min-w-fit flex justify-center py-4">
                            <Pie
                                data={salesbytype}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { position: "top" },
                                        title: { display: true, text: "Platform Distribution" },
                                    },
                                }}                        
                            />
                        </div>
                    </div>

                    <hr />

                    <div className="grid grid-cols-2 gap-4">
                        {/* Monthly Trends Selector and Chart */}

                        <div className="bg-white rounded-md col-span-1 p-4">
                            <h2 className="text-2xl font-bold text-black text-center mb-4">Monthly Trends</h2>
                            <div className="flex justify-center mb-4">
                                <select
                                    className="border rounded-md p-2"
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                >
                                    {monthlyTrends.map((entry) => (
                                        <option key={entry.month} value={entry.month}>
                                            {entry.month}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {selectedMonthData && (
                                <Bar
                                    data={{
                                        labels: selectedMonthData.terms.map((term) => term.term),
                                        datasets: [
                                            {
                                                label: `Searches in ${selectedMonth}`,
                                                data: selectedMonthData.terms.map((term) => term.searches),
                                                backgroundColor: ['#F9E79F', '#D2B4DE', '#B5EAD7'],
                                            },
                                        ],
                                    }}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: { position: "top" },
                                            title: { display: true, text: `Top Searched Terms in ${selectedMonth}` },
                                        },
                                        scales: {
                                            y: {
                                                max: 5000
                                            }
                                        }
                                    }}

                                />
                            )}
                        </div>

                        {/* Platform Distribution Horizontal Bar Chart */}
                        <div className="bg-white rounded-md col-span-1 min-h-fit min-w-fit max-w-full flex justify-center py-4">
                            <Bar
                                data={{
                                    labels: platformDistribution.labels,
                                    datasets: [
                                        {
                                            label: "Sales by Type",
                                            data: platformDistribution.datasets[0].data,
                                            backgroundColor: platformDistribution.datasets[0].backgroundColor,
                                        },
                                    ],
                                }}
                                options={{
                                    responsive: true,
                                    indexAxis: "y", // Horizontal bar chart
                                    plugins: {
                                        legend: { position: "top" },
                                        title: { display: true, text: "Sales by Type (Platform Distribution)" },
                                    },
                                }}                                
                            />
                        </div>
                    </div>

                    <hr />

                    <div className="grid grid-cols-2 gap-4 bg-white rounded-md">

                        <div className=" col-span-1 min-h-fit min-w-fit flex justify-center py-4">
                            <Doughnut
                                data={
                                    feedbackDistribution
                                }
                                options={{
                                    responsive: true,
                                    plugins: {
                                        title: { display: true, text: "Likes and Dislikes Split" },
                                    },
                                }}
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-y-8">
                            {mockDb.feedbackData.topComments.map((comment, index) => (
                                <p key={index} className="text-black text-center">
                                    <strong className="font-bold text-xl">{comment.user}:</strong> {comment.comment} <em>({comment.likes} likes)</em>
                                </p>
                            ))}
                        </div>
                    </div>

                </main>
                <aside className={`h-screen fixed right-0 top-1/2 w-64 border rounded-lg bg-secondary dark:bg-white shadow-lg transition-transform duration-300 z-50 ${isAsideVisible ? 'translate-x-0' : 'translate-x-full'}`}>
                    <button
                        onClick={() => setIsAsideVisible(!isAsideVisible)}
                        className="absolute -left-10 top-4 bg-primary dark:bg-transparent border border-white text-white p-2 rounded-l-md"
                    >
                        {isAsideVisible ? '→' : '←'}
                    </button>
                    <div className="p-4 text-black">
                        <p className="bg-white dark:bg-secondary text-sm text-wrap text-black dark:text-white p-2 rounded-lg">
                            Sales trends show steady growth, with T-shirts and jeans leading platform distribution. Top-searched items include shoes, jackets, and T-shirts, indicating focus areas for promotions. Opportunities exist to boost visibility for dresses and accessories. Let me know if you’d like targeted recommendations!
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
}
