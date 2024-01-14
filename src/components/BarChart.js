import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

const BarChart = ({chartData,textTitle}) => {
  return (
    <Bar 
        data={chartData} 
        options={{
            plugins:{
                title:{
                    display:true,
                    text:textTitle
                },
                legend:{
                    display:true,
                    position:'bottom'
                }
            }
        }} 
    />
  )
}

export default BarChart;