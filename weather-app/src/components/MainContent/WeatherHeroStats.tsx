type statsData = {
	precipitation: number;
	humidity: number;
	temperature: number;
	wind: number;
};
function WeatherHeroStats({
	precipitation,
	humidity,
	temperature,
	wind,
}: statsData) {
	return (
		<div className="grid grid-cols-2 mt-5 gap-3 sm:grid-cols-4">
			<div className="stats-ceil flex flex-col items-start gap-4 p-3 text-(--neutral) bg-(--veryDarkGray) border border-(--lighterGray)/20 rounded-lg">
				<span className="text-(--neutral)/90 text-md">Feels Like</span>
				<span className="text-2xl">{temperature ? temperature : "-"}°</span>
			</div>
			<div className="stats-ceil flex flex-col items-start gap-4 p-3 text-(--neutral) bg-(--veryDarkGray) border border-(--lighterGray)/20 rounded-lg">
				<span className="text-(--neutral)/90 text-md">Humidity</span>
				<span className="text-2xl">{humidity ? humidity : "-"}%</span>
			</div>
			<div className="stats-ceil flex flex-col items-start gap-4 p-3 text-(--neutral) bg-(--veryDarkGray) border border-(--lighterGray)/20 rounded-lg">
				<span className="text-(--neutral)/90 text-md">Wind</span>
				<span className="text-2xl">{wind ? wind : "-"} km/h</span>
			</div>
			<div className="stats-ceil flex flex-col items-start gap-4 p-3 text-(--neutral) bg-(--veryDarkGray) border border-(--lighterGray)/20 rounded-lg">
				<span className="text-(--neutral)/90 text-md">Precipitation</span>
				<span className="text-2xl">
					{precipitation  ?? "-"} in
				</span>
			</div>
		</div>
	);
}

export default WeatherHeroStats;
