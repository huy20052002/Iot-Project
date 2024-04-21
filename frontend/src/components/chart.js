import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const NUM_DATA_POINTS = 6;
const dataInterval = 5000;

const LineChart = () => {
    const [chartData, setChartData] = useState(generateRandomData());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setChartData(generateRandomData()); 
        }, dataInterval);

        return () => clearInterval(intervalId); 
    }, []);

    function generateRandomData() {
        const timestamps = Array.from({ length: NUM_DATA_POINTS }, (_, i) => {
            return Date.now() - (i * dataInterval);
        });

        const formattedLabels = timestamps.slice().reverse().map(formatTimestamp);

        const newDataPoint = Math.floor(Math.random() * 100);

        const data = {
            labels: formattedLabels,
            datasets: [
                {
                    label: 'Temp (Temperature)',
                    data: [...timestamps.map(() => Math.floor(Math.random() * (40 - 10 + 1)) + 10), newDataPoint],
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.1)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    pointRadius: 5,
                    pointHitRadius: 10,
                },
                {
                    label: 'Humid (Humidity)',
                    data: [...timestamps.map(() => Math.floor(Math.random() * (100 - 40 + 1)) + 40), newDataPoint],
                    fill: false,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    pointRadius: 5,
                    pointHitRadius: 10,
                },
                {
                    label: 'Light',
                    data: [...timestamps.map(() => Math.floor(Math.random() * (300 - 100 + 1)) + 100), newDataPoint],
                    fill: false,
                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                    borderColor: 'rgba(255, 215, 0, 1)',
                    pointRadius: 5,
                    pointHitRadius: 10,
                },
            ],
        };
        return data;
    }

    return (
        <Line data={chartData} options={options} />
    );
};

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

const options = {
    scales: {
        xAxes: [
            {
                type: 'time',
                ticks: {
                    source: 'auto',
                },
            },
        ],
    },
};

export default LineChart;

// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';

// const NUM_DATA_POINTS = 8;
// const dataInterval = 3000;

// const LineChart = () => {
//     const [chartData, setChartData] = useState(generateRandomData());

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             setChartData(prevChartData => updateChartData(prevChartData));
//         }, dataInterval);

//         return () => clearInterval(intervalId); // Cleanup on unmount
//     }, []);

//     function generateRandomData() {
//         const timestamps = Array.from({ length: NUM_DATA_POINTS }, (_, i) => {
//             return Date.now() - ((NUM_DATA_POINTS - i - 1) * dataInterval);
//         });

//         const formattedLabels = timestamps.map(formatTimestamp);

//         const tempData = Array(NUM_DATA_POINTS).fill(null).map(() => Math.floor(Math.random() * 100));
//         const humidData = Array(NUM_DATA_POINTS).fill(null).map(() => Math.floor(Math.random() * (100 - 40 + 1)) + 40);
//         const lightData = Array(NUM_DATA_POINTS).fill(null).map(() => Math.floor(Math.random() * (300 - 100 + 1)) + 100);

//         return {
//             labels: formattedLabels,
//             datasets: [
//                 {
//                     label: 'Temp (Temperature)',
//                     data: tempData,
//                     fill: false,
//                     backgroundColor: 'rgba(255, 99, 132, 0.1)',
//                     borderColor: 'rgba(255, 99, 132, 1)',
//                     pointRadius: 5,
//                     pointHitRadius: 10,
//                 },
//                 {
//                     label: 'Humid (Humidity)',
//                     data: humidData,
//                     fill: false,
//                     backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                     borderColor: 'rgba(54, 162, 235, 1)',
//                     pointRadius: 5,
//                     pointHitRadius: 10,
//                 },
//                 {
//                     label: 'Light',
//                     data: lightData,
//                     fill: false,
//                     backgroundColor: 'rgba(255, 215, 0, 0.2)',
//                     borderColor: 'rgba(255, 215, 0, 1)',
//                     pointRadius: 5,
//                     pointHitRadius: 10,
//                 },
//             ],
//         };
//     }

//     function updateChartData(prevChartData) {
//         const newDataPoint = {
//             temp: Math.floor(Math.random() * 100),
//             humidity: Math.floor(Math.random() * (100 - 40 + 1)) + 40,
//             light: Math.floor(Math.random() * (300 - 100 + 1)) + 100
//         };

//         const newChartData = {
//             ...prevChartData,
//             datasets: prevChartData.datasets.map(dataset => {
//                 return {
//                     ...dataset,
//                     data: [...dataset.data.slice(1), newDataPoint[dataset.label.toLowerCase()]]
//                 };
//             })
//         };

//         return newChartData;
//     }

//     return (
//         <Line data={chartData} options={options} />
//     );
// };

// const formatTimestamp = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
// };

// const options = {
//     scales: {
//         xAxes: [
//             {
//                 type: 'time',
//                 ticks: {
//                     source: 'auto',
//                 },
//             },
//         ],
//     },
// };

// export default LineChart;




// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';

// const NUM_DATA_POINTS = 8;
// const dataInterval = 3000;

// const LineChart = () => {
//   const [chartData, setChartData] = useState(generateRandomData());
//   const [previousData, setPreviousData] = useState(null);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setPreviousData((prevData) => {
//         // Generate random data while keeping previous values for each point
//         const newData = generateRandomData(prevData);
//         setChartData(newData);
//         return newData.datasets.map((dataset) => dataset.data.slice(-1)[0]);
//       });
//     }, dataInterval);

//     return () => clearInterval(intervalId); // Cleanup on unmount
//   }, []);

//   function generateRandomData(previousData) {
//     const timestamps = Array.from({ length: NUM_DATA_POINTS }, (_, i) => {
//       return Date.now() - (i * dataInterval);
//     });

//     const formattedLabels = timestamps.slice().reverse().map(formatTimestamp);

//     const newDataPoint = Math.floor(Math.random() * 100);

//     const data = {
//       labels: formattedLabels,
//       datasets: [
//         {
//           label: 'Temp (Temperature)',
//           data: previousData
//             ? [...previousData[0], newDataPoint] // Use spread syntax for existing data
//             : new Array(NUM_DATA_POINTS - 1).fill(0).concat(newDataPoint), // Initialize with zeros and new point
//           fill: false,
//           backgroundColor: 'rgba(255, 99, 132, 0.1)',
//           borderColor: 'rgba(255, 99, 132, 1)',
//           pointRadius: 5,
//           pointHitRadius: 10,
//         },
//         {
//           label: 'Humid (Humidity)',
//           data: previousData
//             ? [...previousData[1], Math.floor(Math.random() * (100 - 40 + 1)) + 40] // Use spread syntax for existing data
//             : new Array(NUM_DATA_POINTS - 1).fill(0).concat(Math.floor(Math.random() * (100 - 40 + 1)) + 40), // Initialize with zeros and new point
//           fill: false,
//           backgroundColor: 'rgba(54, 162, 235, 0.2)',
//           borderColor: 'rgba(54, 162, 235, 1)',
//           pointRadius: 5,
//           pointHitRadius: 10,
//         },
//         {
//           label: 'Light',
//           data: previousData
//             ? [...previousData[2], Math.floor(Math.random() * (300 - 100 + 1)) + 100] // Use spread syntax for existing data
//             : new Array(NUM_DATA_POINTS - 1).fill(0).concat(Math.floor(Math.random() * (300 - 100 + 1)) + 100), // Initialize with zeros and new point
//           fill: false,
//           backgroundColor: 'rgba(255, 215, 0, 0.2)',
//           borderColor: 'rgba(255, 215, 0, 1)',
//           pointRadius: 5,
//           pointHitRadius: 10,
//         },
//       ],
//     };
//     return data;
//   }

//   const formatTimestamp = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
//   };

//   // Add options for your chart (e.g., scales, tooltips, legends)
//   const options = {
//     scales: {
//       xAxes: [
//         {
//           type: 'time',
//           // Additional options for x-axis
//         },
//       ],
//       // Add options for y-axis if needed
//     },
//     // ... other options
//   };

//   return (
//     <Line data={chartData} options={options} />
//   );
// };

// export default LineChart;