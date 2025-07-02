import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

const UserGrowthChart = ({ data }) => {
  const chartData = {
    labels: data.dates,
    datasets: [
      {
        label: 'User Growth',
        data: data.users,
        borderColor: 'rgba(0, 123, 255, 1)',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        fill: true,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default UserGrowthChart;
