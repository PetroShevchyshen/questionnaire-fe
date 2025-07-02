import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect } from "react";
import { useAnalyticStore } from "../store/analyticStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Analytics = () => {
  const { getAverage, average } = useAnalyticStore();

  useEffect(() => {
    getAverage();
  }, [getAverage]);

  return (
    <div className="max-w-3/4 p-4 rounded-xl">
      <Bar
        data={{
          labels: average.map((item) => item.quiz),
          datasets: [
            {
              label: "completed",
              data: average.map((item) => item.avg),
              backgroundColor: "#789654",
            },
            {
              label: "time spend",
              data: average.map((item) => item.avgTime),
              backgroundColor: "#345987",
            },
          ],
        }}
        options={{
          indexAxis: "y",
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: "Average Quiz Completion and Time Spend",
            },
          },
        }}
      />
    </div>
  );
};
