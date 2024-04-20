import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Sales } from './SalesReportDay';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface SalesLineChartProps {
  sales: Sales[];
}

const SalesLineChart: React.FC<SalesLineChartProps> = ({ sales }) => {
  const labels = sales.map((sale) => sale.day);
  const data = {
    labels,
    datasets: [
      {
        label: 'Total Sales',
        data: sales.map((sale) => sale.totalSales),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Sales Chart',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Sales',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Day',
        },
      },
    },
  };

  return (
    <div className=" sm:w-3/4">
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesLineChart;
