/** @format */

import { useEffect, useRef, useState } from "react";
import SmallerCard from "./SmallerCard";
export default function WeatherCard(props) {
	const [weatherImg, setWeatherImg] = useState("");
	const [location, setLocation] = useState("");
	const [weatherDescr, setWeatherDescr] = useState("");
	const [currentWeather, setCurrentWeather] = useState("");
	const [humidity, setHumidity] = useState("");
	const [windSpeed, setWindSpeed] = useState("");
	const input = useRef(null);
	const [date, setDate] = useState("");
	const [_date, set_Date] = useState("");
	const [smallerCardData, setSmallerCardData] = useState([]);
	const [month, setMonth] = useState("");

	useEffect(() => {
		if (props.data) {
			// console.log(props.data)
			//Date
			const dateArray = new Date().toString().split(" ");
			const day = dateArray[0];
			setMonth(dateArray[1]);
			set_Date(dateArray[2]);
			setDate(`${day}, ${_date} ${month}`);
			//data props
			setWeatherDescr(props.data.list[0].weather[0].main);
			setLocation(props.data.city.name);
			setCurrentWeather(Math.round(props.data.list[0].main.temp - 273.15));
			setHumidity(props.data.list[0].main.humidity);
			setWindSpeed(Math.round(props.data.list[0].wind.speed * 3.6));

			//Weather Img
			if (weatherDescr === "Rain") {
				// console.log(weatherDescr);

				setWeatherImg("/public/WeatherAssets/heavy-rain.png");
			} else if (weatherDescr === "Clouds") {
				// console.log(weatherDescr);
				setWeatherImg("/public/WeatherAssets/cloudy.png");
			} else if (weatherDescr === "Clear") {
				// console.log(weatherDescr);
				setWeatherImg("/public/WeatherAssets/sun.png");
			}

			//Smaller Cards Data
			setSmallerCardData([
				{ ...props.data.list[6] },
				{ ...props.data.list[14] },
				{ ...props.data.list[22] },
				{ ...props.data.list[30] },
			]);
		}
	}, [props.data, weatherDescr]);

	useEffect(() => {
		window.addEventListener("keydown", (event) => {
			if (event.key == "Enter") {
				props.handleLocInput(input.current.value);
			}
		});
	}, []);

	function handleSearch() {
		props.handleLocInput(input.current.value);
	}

	return (
		<>
			<div className="weather-card">
				<div className="input-cont">
					<input
						ref={input}
						type="text"
						className="locationInput"
						placeholder="Search City"
					/>
					<i
						onClick={handleSearch}
						className="fa-solid fa-magnifying-glass"
					></i>
				</div>

				{props.data == false ? (
					<div className="loading-animation">
						<div className="rotating-div"></div>
					</div>
				) : (
					<>
						<div className="loc-n-date">
							<div className="location">
								<i className="fa-solid fa-location-dot"></i>
								<p>{location}</p>
							</div>
							<p className="date">{date}</p>
						</div>
						<div className="pic-n-temp">
							<img src={weatherImg} alt="cloudy" width={100} />
							<div>
								<h1>{currentWeather} ℃</h1>
								<h3>{weatherDescr}</h3>
							</div>
						</div>
						<div className="hum-n-speed">
							<div className="humidity">
								<img
									src="/public/WeatherAssets/humidity.png"
									alt=""
									width={30}
								/>
								<div>
									<p>Humidity</p>
									<h3>{humidity}%</h3>
								</div>
							</div>
							<div className="wind-speed">
								<img src="/public/WeatherAssets/wind.png" alt="" width={30} />
								<div>
									<p>Wind Speed</p>
									<h3>{windSpeed} km/h</h3>
								</div>
							</div>
						</div>
						<div className="more-weather-slider">
							{smallerCardData.map((item, index) => {
								return (
									<SmallerCard
										key={index}
										data={item}
										month={month}
										_date={_date}
									/>
								);
							})}
						</div>
					</>
				)}
			</div>
		</>
	);
}
