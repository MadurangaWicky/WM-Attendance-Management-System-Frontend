import React from 'react';
import ScatterChart from './ScatterChart';

const chartData = {
    labels: ['Red', 'Orange', 'Blue'],
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
        {
          label: 'Popularity of colours',
          data: [55, 23, 96],
          // you can set indiviual colors for each bar
          backgroundColor: [
            'rgba(255, 200, 255, 0.6)',
            'rgba(255, 100, 255, 0.6)',
            'rgba(255, 50, 255, 0.6)',
          ],
          borderWidth: 1,
        }
    ]
}

const StatisticsCharts = () => {
  return (
    <ScatterChart
        chartData={chartData}
        textTitle="Scatter Chart"
    />
  )
}

export default StatisticsCharts;