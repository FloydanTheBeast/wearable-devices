import React from "react";
import Chart from "react-apexcharts";

const DataChart = ({ data, title }) => {
	const options = {
		chart: {
			type: "line",
			fontFamily: '"Montserrat", sans-serif'
		},
		colors: ["#66DA26"],
		stroke: {
			width: [5],
			curve: "smooth"
		},
		labels: [
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
			"Sunday"
		],
		yaxis: {
			decimalsInFloat: 0
		}
	};

	const series = [
		{
			name: title,
			data
		}
	];

	return (
		<>
			<h2>{title}</h2>
			<Chart options={options} series={series} height={300} />
		</>
	);
};

export default DataChart;
