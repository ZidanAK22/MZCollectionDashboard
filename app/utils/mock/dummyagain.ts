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
  labels: string[];
  datasets: Dataset[];
}

interface PieChart {
  labels: string[];
  datasets: PieDataset[];
}

interface MonthlyTrendTerm {
  term: string;
  searches: number;
}

interface MonthlyTrend {
  month: string;
  terms: MonthlyTrendTerm[];
}

interface SalesByType {
  type: string;
  sales: number;
}

export interface AnalyticsType {
  globalsales: TimeSeriesChart;
  salesbytype: PieChart;
  monthlyTrends: MonthlyTrend[];
  platformDistribution: PieChart;
}

const mockDb = {
  monthlyTrends: [
    { month: "January", terms: [{ term: "Shoes", searches: 1500 }, { term: "Jackets", searches: 1200 }, { term: "T-Shirts", searches: 1000 }] },
    { month: "February", terms: [{ term: "Jeans", searches: 1800 }, { term: "Shoes", searches: 1600 }, { term: "T-Shirts", searches: 1400 }] },
    { month: "March", terms: [{ term: "Shoes", searches: 2000 }, { term: "Jeans", searches: 1800 }, { term: "Jackets", searches: 1600 }] },
    { month: "April", terms: [{ term: "T-Shirts", searches: 2500 }, { term: "Jeans", searches: 2200 }, { term: "Shoes", searches: 2100 }] },
    { month: "May", terms: [{ term: "Jackets", searches: 2700 }, { term: "Shoes", searches: 2600 }, { term: "T-Shirts", searches: 2300 }] },
    { month: "June", terms: [{ term: "T-Shirts", searches: 3000 }, { term: "Jeans", searches: 2800 }, { term: "Jackets", searches: 2500 }] },
    { month: "July", terms: [{ term: "Shoes", searches: 3200 }, { term: "Jeans", searches: 3000 }, { term: "T-Shirts", searches: 2700 }] },
    { month: "August", terms: [{ term: "Jackets", searches: 3500 }, { term: "Shoes", searches: 3300 }, { term: "T-Shirts", searches: 3100 }] },
    { month: "September", terms: [{ term: "T-Shirts", searches: 3100 }, { term: "Shoes", searches: 2900 }, { term: "Jeans", searches: 2700 }] },
    { month: "October", terms: [{ term: "Jeans", searches: 3300 }, { term: "T-Shirts", searches: 3200 }, { term: "Shoes", searches: 3100 }] },
    { month: "November", terms: [{ term: "Shoes", searches: 4000 }, { term: "T-Shirts", searches: 3800 }, { term: "Jeans", searches: 3600 }] },
    { month: "December", terms: [{ term: "T-Shirts", searches: 4500 }, { term: "Shoes", searches: 4400 }, { term: "Jackets", searches: 4200 }] },
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
  const globalsales: TimeSeriesChart = {
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

  const salesbytype: PieChart = {
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

  // Create monthly trends with top 5 searched terms for each month
  const monthlyTrends: MonthlyTrend[] = mockDb.monthlyTrends.map((entry) => ({
    month: entry.month,
    terms: entry.terms.slice(0, 5).map((term) => ({
      term: term.term,
      searches: term.searches,
    })),
  }));

  const platformDistribution: PieChart = {
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

  return { globalsales, salesbytype, monthlyTrends, platformDistribution };
};
