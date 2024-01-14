import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

const PieChart = ({chartData,textTitle}) => {
  return (
    <Pie
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

export default PieChart;