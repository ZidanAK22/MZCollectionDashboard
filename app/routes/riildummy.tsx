import { useLoaderData } from "@remix-run/react";
import { Line, Pie, Bar, Doughnut } from "react-chartjs-2";
import { getAnalytics } from "~/utils/mock/dummyagain";
import type { MetaFunction } from "@remix-run/node";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, BarElement);

export const loader = getAnalytics;

export default function Dashboard() {
    const { globalsales, salesbytype, monthlyTrends, platformDistribution, feedbackDistribution } = useLoaderData<typeof loader>();

    return (
        <div className="flex flex-col h-screen items-center my-4">
            <h1 className="text-4xl font-bold text-center">
                E-Commerce Business{" "}
                <span className="italic bg-gradient-to-br from-primary to-secondary text-transparent bg-clip-text">Analytics</span> Dashboard
            </h1>
            <main className="bg-secondary dark:bg-transparent border rounded-lg mx-4 mt-4 p-8 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-md col-span-2 max-h-[50vh] min-h-fit min-w-fit flex justify-center py-4">
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
                    <div className="bg-white rounded-md col-span-1 max-h-[50vh] min-h-fit min-w-fit flex justify-center py-4">
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

                {/* Monthly Trends Bar Chart */}
                <div className="bg-white rounded-md col-span-3 max-h-[50vh] min-h-fit min-w-fit flex justify-center py-4">
                    <Bar
                        data={{
                            labels: monthlyTrends.map((entry) => entry.month),
                            datasets: [
                                {
                                    label: "Top 5 Searched Terms",
                                    data: monthlyTrends.flatMap((entry) =>
                                        entry.terms.map((term) => term.searches)
                                    ),
                                    backgroundColor: "#4CAF50",
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: "top" },
                                title: { display: true, text: "Top 5 Monthly Search Terms" },
                            },
                        }}
                    />
                </div>

                {/* Platform Distribution Horizontal Bar Chart */}
                <div className="bg-white rounded-md col-span-3 max-h-[50vh] min-h-fit min-w-fit flex justify-center py-4">
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

                <div className="bg-white rounded-md col-span-3 max-h-[50vh] min-h-fit min-w-fit flex justify-center py-4">
                    <Doughnut
                    data={
                        salesbytype
                    }                    
                    />
                </div>

                <div className="bg-white rounded-md col-span-3 max-h-[50vh] min-h-fit min-w-fit flex justify-center py-4">
                    <Doughnut
                    data={
                        feedbackDistribution
                    }                    
                    />
                </div>
            </main>
        </div>
    );
}
