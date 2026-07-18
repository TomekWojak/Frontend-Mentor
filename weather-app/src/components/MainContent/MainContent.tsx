import Header from "../Header.tsx";
import WeatherHero from "../MainContent/WeatherHero.tsx";
import WeatherHeroStats from "../MainContent/WeatherHeroStats.tsx";
import SkeletonLoading from "../MainContent/SkeletonLoading.tsx";
import DailyForecast from "../MainContent/DailyForecast.tsx";
import { getWeatherIcon } from "../MainContent/MappedIcon.tsx";
import { fetchWeatherApi } from "openmeteo";
import { useEffect, useState } from "react";

type CurrentWeather = {
	time: Date;
	temperature_2m: number;
	relative_humidity_2m: number;
	apparent_temperature: number;
	precipitation: number;
	rain: number;
	showers: number;
	snowfall: number;
	cloud_cover: number;
	wind_speed_10m: number;
	weather_code: number;
};
type HourlyWeather = {
	time: Date[];
	temperature_2m: Float32Array | null;
	relative_humidity_2m: Float32Array | null;
};

type DailyWeather = {
	time: Date[];
	temperature_2m_max: Float32Array | null;
	temperature_2m_min: Float32Array | null;
	weather_code: Float32Array | null;
};

type WeatherData = {
	current: CurrentWeather;
	hourly: HourlyWeather;
	daily: DailyWeather;
};
type LocationData = {
	city: string;
	country: string;
};

function MainContent() {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [location, setLocation] = useState<LocationData | null>(null);

	useEffect(() => {
		const fetchWeatherForUserLocation = async () => {
			try {
				if (!navigator.geolocation) {
					throw new Error("Geolocation is not supprted :/");
				}

				const position = await new Promise<GeolocationPosition>((res, rej) => {
					navigator.geolocation.getCurrentPosition(res, rej);
				});
				const { latitude, longitude } = position.coords;

				const params = {
					latitude,
					longitude,
					daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
					hourly: ["temperature_2m", "relative_humidity_2m"],
					current: [
						"temperature_2m",
						"relative_humidity_2m",
						"apparent_temperature",
						"precipitation",
						"rain",
						"showers",
						"snowfall",
						"cloud_cover",
						"wind_speed_10m",
					],
				};
				const url = "https://api.open-meteo.com/v1/forecast";
				const responses = await fetchWeatherApi(url, params);

				const response = responses[0];
				const utcOffsetSeconds = response.utcOffsetSeconds();

				const current = response.current()!;
				const hourly = response.hourly()!;
				const daily = response.daily()!;

				const weatherData = {
					current: {
						time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
						temperature_2m: current.variables(0)!.value(),
						relative_humidity_2m: current.variables(1)!.value(),
						apparent_temperature: current.variables(2)!.value(),
						precipitation: current.variables(3)!.value(),
						rain: current.variables(4)!.value(),
						showers: current.variables(5)!.value(),
						snowfall: current.variables(6)!.value(),
						cloud_cover: current.variables(7)!.value(),
						wind_speed_10m: current.variables(8)!.value(),
						weather_code: current.variables(9)!.value(),
					},
					hourly: {
						time: Array.from(
							{
								length:
									(Number(hourly.timeEnd()) - Number(hourly.time())) /
									hourly.interval(),
							},
							(_, i) =>
								new Date(
									(Number(hourly.time()) +
										i * hourly.interval() +
										utcOffsetSeconds) *
										1000,
								),
						),
						temperature_2m: hourly.variables(0)!.valuesArray(),
						relative_humidity_2m: hourly.variables(1)!.valuesArray(),
					},
					daily: {
						time: Array.from(
							{
								length:
									(Number(daily.timeEnd()) - Number(daily.time())) /
									daily.interval(),
							},
							(_, i) =>
								new Date(
									(Number(daily.time()) +
										i * daily.interval() +
										utcOffsetSeconds) *
										1000,
								),
						),
						temperature_2m_max: daily.variables(0)!.valuesArray(),
						temperature_2m_min: daily.variables(1)!.valuesArray(),
						weather_code: daily.variables(2)!.valuesArray(),
					},
				};
				setWeatherData(weatherData);
				async function getLocationName(latitude: number, longitude: number) {
					const response = await fetch(
						`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
					);

					if (!response.ok) {
						throw new Error("Nie udało się pobrać nazwy lokalizacji");
					}

					const data = await response.json();
					return {
						city:
							data.address.city ??
							data.address.town ??
							data.address.village ??
							data.address.municipality,
						country: data.address.country,
					};
				}
				const { city, country } = await getLocationName(latitude, longitude);
				console.log(weatherData);
				setLocation({
					city,
					country,
				});
			} catch (err) {
				setError(err instanceof Error ? err.message : "Something went wrong");
			} finally {
				setIsLoading(false);
			}
		};
		fetchWeatherForUserLocation();
	}, []);
	return (
		<>
			<Header />
			{isLoading ? (
				<SkeletonLoading />
			) : (
				weatherData && (
					<main>
						<section className="wrapper">
							<div>
								<WeatherHero
									city={location && location.city}
									country={location && location.country}
									temperature={Math.round(
										weatherData.current.apparent_temperature,
									)}
									iconRef={getWeatherIcon(weatherData.current.weather_code)}
								/>

								<WeatherHeroStats
									precipitation={Math.round(weatherData.current.precipitation)}
									humidity={Math.round(
										weatherData.current.relative_humidity_2m,
									)}
									temperature={Math.round(weatherData.current.temperature_2m)}
									wind={Math.round(weatherData.current.wind_speed_10m)}
								/>
							</div>
						</section>
						<section className="wrapper">
							<DailyForecast weather={weatherData} />
						</section>
					</main>
				)
			)}
		</>
	);
}

export default MainContent;
