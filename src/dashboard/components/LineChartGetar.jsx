import { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { collection, getDocs } from 'firebase/firestore';
import db from '../constant/firebase';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

const LineChartGetar = () => {
  let chart;
  const [label, setLabel] = useState([]);
  const [daily, setDaily] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const items = [];
  let index = 0;
  const filteredData = [0, 0, 0, 0, 0, 0, 0];

  const getDaily = async () => {
    const date = new Date();
    date.setDate(date.getDate() - index);
    try {
      const currentMonth = date.getMonth() + 1;
      const currentDate = date.getDate();
      const dailyRef = collection(db, `dailyAverages/${currentMonth}/${currentDate}`);
      const querySnapshot = await getDocs(dailyRef);
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      items.map((item, idx) => filteredData[6 - idx] = (item.magnitude));
      setDaily(filteredData);
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

  const handleLabels = () => {
    const labels = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - i);
      const formattedDate = currentDate.toLocaleString('default', { month: 'short', day: 'numeric' });
      labels.push(formattedDate);
    }

    setLabel(labels);
  };


  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  async function chartValue() {
    let ctx = document.getElementById('chartGetar').getContext('2d');
    chart = new ChartJS(ctx, {
      type: 'line',
      data: {
        labels: label,
        datasets: [
          {
            label: 'My First Dataset',
            data: daily,
            fill: false,
            borderColor: '#4D4D4D',
            tension: 0.5,
          },
        ],
      },
      options: {
        tooltip: {
          mode: 'index',
        },
      },
    });
    if (chart) {
      if(chart.id <= 1){
        chart.destroy();
      }
    }
  }
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

useEffect(() => {
  handleLabels();
  for (index; index < 7; index++) {
    getDaily();
  }
}, []);

useEffect(() => {
  chartValue();
}, [daily]);

return (
  <div style={{ margin: window.innerWidth < 768 ? '5vw' : '4vw' }}>
    <p>Statistik Gempa</p>
    <canvas id='chartGetar'></canvas>
  </div>
);
};

export default LineChartGetar;
