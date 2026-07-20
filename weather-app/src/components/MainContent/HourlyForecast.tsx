import { useState, useEffect, useRef } from "react";
import iconDropdown from "../../assets/icon-dropdown.svg";
import { getWeatherIcon } from "../MainContent/MappedIcon.tsx";
import type { DailyForecastProps } from "../../types/weather.ts";

function HourlyForecast({ weather, temperatureUnit }: DailyForecastProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedWeekday, setSelectedWeekday] = useState("Monday");
	const selectRef = useRef<HTMLDivElement>(null);
	const weekDays = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];
	const { time, temperature_2m, weather_code } = weather.hourly;

	useEffect(() => {
		const handleClickOutsideSelect = (e: MouseEvent) => {
			if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("click", handleClickOutsideSelect);
		return () => {
			document.removeEventListener("click", handleClickOutsideSelect);
		};
	}, []);
	const handleOptionClick = (weekday: string) => {
		setSelectedWeekday(weekday);
		setIsOpen(!isOpen);
	};
	const currentWeekdayData = time
		.map((tm, index) => ({
			time: tm,
			temperature: temperature_2m[index],
			weatherCode: weather_code[index],
		}))
		.filter(
			(item) =>
				item.time.toLocaleDateString("en-US", {
					weekday: "long",
				}) === selectedWeekday,
		);
	return (
		<div className="hourly-forecast text-(--neutral) p-3 mt-7 rounded-2xl bg-(--veryDarkGray) md:mt-0 md:row-1 md:col-3">
			<div className="hourly-forecast-body">
				<div className="hourly-forecast-top mb-3 flex justify-between items-center">
					<span>Hourly forecast</span>
					<div ref={selectRef} className="select relative">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="flex gap-2 bg-(--darkerGray) w-fit px-3 py-1 rounded-md hover:bg-(--lightGray)/20 transition-colors duration-300 border border-transparent focus-visible:outline-none focus-visible:border-(--neutral)">
							{selectedWeekday} <img src={iconDropdown} alt="" />
						</button>

						{isOpen && (
							<div className="absolute min-w-45 -bottom-2 right-0 translate-y-full p-2 rounded-lg bg-(--darkerGray) border border-(--lighterGray)/20">
								{weekDays.map((weekday) => (
									<button
										onClick={() => handleOptionClick(weekday)}
										role="option"
										key={weekday}
										className="p-2 block w-full text-left hover:bg-(--lightGray)/20 transition-colors duration-300 rounded-lg cursor-default border border-transparent focus-visible:outline-none focus-visible:border-(--neutral)">
										{weekday}
									</button>
								))}
							</div>
						)}
					</div>
				</div>
				<ul className="hourly-forecast-data flex flex-col gap-3">
					{currentWeekdayData
						.slice(15, 23)
						.map(({ time, temperature, weatherCode }, i) => {
							return (
								<li
									key={`${time.toLocaleTimeString("en-US")}-${i}`}
									className="flex items-center gap-2 p-2 bg-(--darkerGray) border border-(--lighterGray)/20 rounded-md">
									<img width={30} src={getWeatherIcon(weatherCode)} alt="" />

									<span>
										{time.toLocaleTimeString("en-US", {
											hour: "numeric",
											hour12: true,
										})}
									</span>

									<span className="ml-auto">
										{temperatureUnit === "celsius"
											? `${Math.round(temperature)}°`
											: `${Math.round(temperature * 1.8 + 32)}°F`}
									</span>
								</li>
							);
						})}
				</ul>
			</div>
		</div>
	);
}
export default HourlyForecast;
