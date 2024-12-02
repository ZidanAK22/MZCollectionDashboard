import { useLoaderData } from "@remix-run/react";
import { Line, Pie } from "react-chartjs-2";
import { getAnalytics } from "~/utils/mock/analytics";
import type { MetaFunction } from "@remix-run/node";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

export const meta: MetaFunction = () => {
  return [
    { title: "MZ Collection" },
    { name: "description", content: "Dashboard" },
  ];
};
export const loader = getAnalytics


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const {timeSeries, pieChart} = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col h-screen items-center my-4">
      <h1 className="text-4xl font-bold text-center">E-Commerce Business <span className="italic bg-gradient-to-br from-primary to-secondary text-transparent bg-clip-text">Analytics</span> Dashboard</h1>
      <main className="bg-secondary dark:bg-transparent border rounded-lg mx-4 mt-4 p-8 space-y-4">
        {/* CARD GRID HERE */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-md col-span-2 max-h-[50vh] min-h-fit min-w-fit flex justify-center py-4">
            <Line data={timeSeries} options={{ responsive: true, plugins: { legend: { position: "top" }, title: { display: true, text: "Global Sales Over Time" } } }} />
          </div>
          <div className="bg-white rounded-md col-span-1 max-h-[50vh] min-h-fit min-w-fit flex justify-center py-4">
            <Pie data={pieChart} options={{ responsive: true, plugins: { legend: { position: "top" }, title: { display: true, text: "Platform Distribution" } } }} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-md col-span-3 max-h-min">
            <label htmlFor="trend-query" className="mr-4 bg-red">
              Enter a Query:
            </label>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima atque amet pariatur debitis animi nisi vero nulla molestias, veniam quibusdam inventore delectus, deleniti tempore dolore fugiat maiores similique nihil adipisci.
        </p>
      </main>
    </div>
  );
}
