import axios from "axios";
import { addWeeks, endOfWeek, subDays } from "date-fns";

const API_BASE_URL = "https://www.googleapis.com/fitness/v1/users/me";

export const dataTypes = [
	{
		name: "Calories burned",
		type: "com.google.calories.expended"
	},
	{
		name: "Heart points",
		type: "com.google.heart_minutes"
	},
	{
		name: "Move minutes",
		type: "com.google.active_minutes"
	},
	{
		name: "Step count",
		type: "com.google.step_count.delta"
	},
	{
		name: "Distance",
		type: "com.google.distance.delta"
	}
];

export const getUserDevices = (accessToken) => {
	return axios
		.get(`${API_BASE_URL}/dataSources`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})
		.then((response) => {
			let devices = new Set();

			response.data.dataSource.forEach((dataSource) => {
				const { device } = dataSource;
				device && devices.add(`${device.manufacturer} ${device.model}`);
			});

			return devices;
		})
		.catch((err) => {
			console.log(err);
		});
};

export const aggregateData = (accessToken, dataType, weekOffset) => {
	const millisInDay = 86400000;
	const endTime = addWeeks(
		endOfWeek(new Date(), { weekStartsOn: 1 }),
		weekOffset
	);

	return axios
		.post(
			`${API_BASE_URL}/dataset:aggregate`,
			{
				aggregateBy: [
					{
						dataTypeName: dataType.type
					}
				],
				bucketByTime: {
					durationMillis: millisInDay
				},
				endTimeMillis: endTime.getTime(),
				startTimeMillis: subDays(endTime, 7).getTime()
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		)
		.then((response) => {
			return response.data.bucket.map(
				(bucket) =>
					bucket.dataset[0]?.point[0]?.value[0]?.intVal ||
					bucket.dataset[0]?.point[0]?.value[0]?.fpVal ||
					null
			);
		});
};
