import { useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title,CategoryScale } from 'chart.js';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title,CategoryScale);


const LineChart = () => {
    let chart ;

    async function chartValue(){
        if(chart){
            chart.destroy();
        }
        let ctx = document.getElementById('chartApi').getContext('2d');
        chart = new ChartJS(ctx,{
            type : 'line',
            data : {
                labels: ['Dec 6','Dec 7','Dec 8','Dec 9','Dec 10','Dec 11','Dec 12'],
                datasets: [
                {
                    label: 'My First Dataset',
                    data: [65, 45, 60, 36, 33, 12, 22],
                    fill: false,
                    borderColor: '#4D4D4D',
                    tension: 0.5,
                },
                ],
            },
            option: {
                tooltip: {
                  mode: 'index',
                },
              },
        })
    };

    useEffect(()=>{
        chartValue();
    },[])

    return (
        <div className='m-5'>
            <p>Statistik Api</p>
            <canvas id='chartApi'></canvas>
        </div>
    );
};

export default LineChart;