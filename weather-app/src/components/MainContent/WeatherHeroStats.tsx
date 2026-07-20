import type {
	TemperatureUnit,
	WindUnit,
	PrecipitationUnit,
} from "../../types/units.ts";
type statsData = {
	temperatureUnit: TemperatureUnit;
	windUnit: WindUnit;
	precipitationUnit: PrecipitationUnit;
	precipitation: number;
	humidity: number;
	temperature: number;
	wind: number;
};
function WeatherHeroStats({
	temperatureUnit,
	windUnit,
	precipitationUnit,
	precipitation,
	humidity,
	temperature,
	wind,
}: statsData) {
	return (
		<div className="grid grid-cols-2 mt-5 gap-3 sm:grid-cols-4">
			<div className="stats-ceil flex flex-col items-start gap-4 p-3 text-(--neutral) bg-(--veryDarkGray) border border-(--lighterGray)/20 rounded-lg">
				<span className="text-(--neutral)/90 text-md">Feels Like</span>
				<span className="text-2xl">
					{temperatureUnit === "celsius"
						? `${temperature}°`
						: `${Math.round(temperature * 1.8 + 32)}°F`}
					
				</span>
			</div>
			<div className="stats-ceil flex flex-col items-start gap-4 p-3 text-(--neutral) bg-(--veryDarkGray) border border-(--lighterGray)/20 rounded-lg">
				<span className="text-(--neutral)/90 text-md">Humidity</span>
				<span className="text-2xl">{humidity ? humidity : "-"}%</span>
			</div>
			<div className="stats-ceil flex flex-col items-start gap-4 p-3 text-(--neutral) bg-(--veryDarkGray) border border-(--lighterGray)/20 rounded-lg">
				<span className="text-(--neutral)/90 text-md">Wind</span>
				<span className="text-2xl">
					{windUnit === "kmh"
						? `${wind} km/h`
						: `${Math.round(wind * 0.621371)} mp/h`}
				</span>
			</div>
			<div className="stats-ceil flex flex-col items-start gap-4 p-3 text-(--neutral) bg-(--veryDarkGray) border border-(--lighterGray)/20 rounded-lg">
				<span className="text-(--neutral)/90 text-md">Precipitation</span>
				<span className="text-2xl">
					{precipitationUnit === "mm"
						? `${precipitation} mm`
						: `${precipitation / 25.4} in`}
				</span>
			</div>
		</div>
	);
}

export default WeatherHeroStats;
