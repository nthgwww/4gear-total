import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';


const Dashboard = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: ['Tháng 9', 'Tháng 10', 'Tháng 11'],
      datasets: [
        {
          label: 'Doanh thu',
          data: [18456, 23800, 0],
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default Dashboard;
