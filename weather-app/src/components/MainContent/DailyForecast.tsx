import { getWeatherIcon } from "../MainContent/MappedIcon.tsx";
import type { DailyForecastProps } from "../../types/weather.ts";

function DailyForecast({ weather }: DailyForecastProps) {
	const { time, temperature_2m_min, temperature_2m_max, weather_code } =
		weather.daily;

	return (
		<div className="daily-forecast mt-7">
			<p className="text-(--neutral) mb-4">Daily forecast</p>
			<div className="daily-forecast-ceils grid grid-cols-[repeat(auto-fit,minmax(90px,1fr))] gap-3">
				{time.map((tm, i) => (
					<div
						key={`${tm}-${i}`}
						className="h-35 p-3 bg-(--veryDarkGray) border border-(--lighterGray)/20 rounded-lg text-(--neutral) text-center flex flex-col">
						<span>{tm.toLocaleDateString("en-US", { weekday: "short" })}</span>
						<img
							className="block mx-auto mt-auto"
							width={60}
							src={getWeatherIcon(weather_code[i])}
							alt=""
						/>
						<div className="flex justify-between mt-auto">
							<span>{Math.round(temperature_2m_max[i])}°</span>
							<span>{Math.round(temperature_2m_min[i])}°</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
export default DailyForecast;
