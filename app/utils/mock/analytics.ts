// Mock database and loader logic for charts
import type { LoaderFunction } from "@remix-run/node";

interface Dataset {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    tension: number;
}

interface PieDataset {
    data: number[];
    backgroundColor: string[];
}

interface TimeSeriesChart {
    labels: string[]; // Array of month names
    datasets: Dataset[];
}

interface PieChart {
    labels: string[]; // Array of sales types
    datasets: PieDataset[];
}

export interface AnalyticsType {
    timeSeries: TimeSeriesChart;
    pieChart: PieChart;
}



// Mock database
const mockDb = {
    monthlyTrends: [
        { month: "January", searches: 1500 },
        { month: "February", searches: 1800 },
        { month: "March", searches: 2000 },
        { month: "April", searches: 2500 },
        { month: "May", searches: 2700 },
        { month: "June", searches: 3000 },
        { month: "July", searches: 3200 },
        { month: "August", searches: 3500 },
        { month: "September", searches: 3100 },
        { month: "October", searches: 3300 },
        { month: "November", searches: 4000 },
        { month: "December", searches: 4500 },
    ],
    feedbackData: {
        likes: 15000,
        dislikes: 3000,
        topComments: [
            { user: "Alice", comment: "Great selection this month!", likes: 120 },
            { user: "Bob", comment: "Could use more variety in sizes.", likes: 80 },
            { user: "Charlie", comment: "Affordable and trendy!", likes: 150 },
            { user: "Diana", comment: "Loved the new jacket designs.", likes: 200 },
        ],
    },
    salesByType: [
        { type: "T-Shirts", sales: 12000 },
        { type: "Jeans", sales: 8000 },
        { type: "Jackets", sales: 6000 },
        { type: "Dresses", sales: 5000 },
        { type: "Shoes", sales: 7000 },
        { type: "Accessories", sales: 3000 },
    ],
    rawMonthlySales: [
        { month: "January", sales: 45000 },
        { month: "February", sales: 47000 },
        { month: "March", sales: 50000 },
        { month: "April", sales: 52000 },
        { month: "May", sales: 55000 },
        { month: "June", sales: 57000 },
        { month: "July", sales: 60000 },
        { month: "August", sales: 65000 },
        { month: "September", sales: 62000 },
        { month: "October", sales: 64000 },
        { month: "November", sales: 70000 },
        { month: "December", sales: 75000 },
    ],
};

export const getAnalytics: LoaderFunction = async (): Promise<AnalyticsType> => {
    const timeSeries: TimeSeriesChart = {
        labels: mockDb.rawMonthlySales.map((entry) => entry.month),
        datasets: [
            {
                label: "Monthly Sales",
                data: mockDb.rawMonthlySales.map((entry) => entry.sales),
                fill: false,
                borderColor: "#4CAF50",
                tension: 0.4,
            },
        ],
    };

    const pieChart: PieChart = {
        labels: mockDb.salesByType.map((entry) => entry.type),
        datasets: [
            {
                data: mockDb.salesByType.map((entry) => entry.sales),
                backgroundColor: mockDb.salesByType.map(
                    () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
                ),
            },
        ],
    };

    return { timeSeries, pieChart };
};

