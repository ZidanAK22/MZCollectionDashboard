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

interface PieSplit {
  labels: string[],
  datasets: number[],
}

export interface AnalyticsType {
  globalsales: TimeSeriesChart;
  salesbytype: PieChart;
  monthlyTrends: MonthlyTrend[];
  platformDistribution: PieChart;
  feedbackDistribution: PieChart;
}

export const mockDb = {
  monthlyTrends: [
    { month: "August", terms: [{ term: "Jackets", searches: 251 }, { term: "Shoes", searches: 17 }, { term: "T-Shirts", searches: 76 }] },
    { month: "September", terms: [{ term: "T-Shirts", searches: 34 }, { term: "Shoes", searches: 123 }, { term: "Jeans", searches: 40 }] },
    { month: "October", terms: [{ term: "Jeans", searches: 232 }, { term: "T-Shirts", searches: 103 }, { term: "Shoes", searches: 111 }] },
    { month: "December", terms: [{ term: "T-Shirts", searches: 102 }, { term: "Shoes", searches: 21 }, { term: "Jackets", searches: 100 }] },
    { month: "January", terms: [{ term: "Shoes", searches: 113 }, { term: "Jackets", searches: 29 }, { term: "T-Shirts", searches: 50 }] },
    { month: "March", terms: [{ term: "Shoes", searches: 121 }, { term: "Jeans", searches: 40 }, { term: "Jackets", searches: 55 }] },
    { month: "April", terms: [{ term: "T-Shirts", searches: 152 }, { term: "Jeans", searches: 201 }, { term: "Shoes", searches: 70 }] },
    { month: "May", terms: [{ term: "Jackets", searches: 70 }, { term: "Shoes", searches: 57 }, { term: "T-Shirts", searches: 12 }] },
    { month: "June", terms: [{ term: "T-Shirts", searches: 77 }, { term: "Jeans", searches: 11 }, { term: "Jackets", searches: 82 }] },
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
    { type: "T-Shirts", sales: 497 },
    { type: "Jeans", sales: 490 },
    { type: "Jackets", sales: 349 },
    { type: "Dresses", sales: 401 },
    { type: "Shoes", sales: 109 },
    { type: "Accessories", sales: 329 },
  ],
  rawMonthlySales: [
    { month: "August", sales: 251 },
    { month: "September", sales: 123 },
    { month: "October", sales: 232 },
    { month: "December", sales: 102 },
    { month: "January", sales: 113 },
    { month: "March", sales: 121 },
    { month: "April", sales: 201 },
    { month: "May", sales: 70 },
    { month: "June", sales: 82 },
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
        borderColor: "#a2d2ff",
        tension: 0.4,
      },
    ],
  };

  const salesbytype: PieChart = {
    labels: mockDb.salesByType.map((entry) => entry.type),
    datasets: [
      {
        data: mockDb.salesByType.map((entry) => entry.sales),
        backgroundColor: ['#ABDEE6', '#CBAACB', '#FFFFB5', '#FFCCB6', '#F4B0C3', '#97C1A9'],
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
        backgroundColor: ['#ABDEE6', '#CBAACB', '#FFFFB5', '#FFCCB6', '#F4B0C3', '#97C1A9']
      },
    ],
  };

  const feedbackDistribution: PieChart = {
    labels: ["Likes", "Dislikes"],
    datasets: [
      {
        data: [mockDb.feedbackData.likes, mockDb.feedbackData.dislikes],
        backgroundColor: ["#A8E6CF", "#FF8F8F"], // Green for likes, Red for dislikes
      },
    ],
  };
  

  return { globalsales, salesbytype, monthlyTrends, platformDistribution, feedbackDistribution };
};
