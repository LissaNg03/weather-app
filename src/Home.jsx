/** @format */

import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import "./Weather.css";

export default function Home() {
	const [data, setData] = useState(false);
	const [locationInput, setLocationInput] = useState("Port Elizabeth");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setData(false);
		fetch(
			`https://api.openweathermap.org/data/2.5/forecast?q=${locationInput}&appid=547532896eb08ee6acc4a9043505a44d`
		)
			.then((Response) => {
				if (Response.ok) {
					return Response.json();
				} else {
					throw new Error("Could not fetch data");
				}
			})
			.then((data) => {
				setData(data);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(true);
				setError(true);
			});
	}, [locationInput]);

	function handleLocInput(input) {
		setLocationInput(input);
	}

	return (
		<>
			<WeatherCard
				locationInput={locationInput}
				data={data}
				handleLocInput={handleLocInput}
				isLoading={isLoading}
				error={error}
			/>
		</>
	);
}
