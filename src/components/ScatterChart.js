import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

const ScatterChart = ({chartData,textTitle}) => {
  return (
    <Scatter
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

export default ScatterChart;