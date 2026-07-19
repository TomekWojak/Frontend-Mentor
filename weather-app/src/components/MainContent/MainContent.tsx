import Header from "../Header.tsx";
import WeatherHero from "../MainContent/WeatherHero.tsx";
import WeatherHeroStats from "../MainContent/WeatherHeroStats.tsx";
import SkeletonLoading from "../MainContent/SkeletonLoading.tsx";
import DailyForecast from "../MainContent/DailyForecast.tsx";
import HourlyForecast from "../MainContent/HourlyForecast.tsx";
import { getWeatherIcon } from "../MainContent/MappedIcon.tsx";
import { fetchWeatherApi } from "openmeteo";
import { useEffect, useState } from "react";
import type { WeatherData, LocationData } from "../../types/weather.ts";

function MainContent() {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
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
					hourly: ["temperature_2m", "weather_code"],
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

				const weatherData: WeatherData = {
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
						temperature_2m: hourly.variables(0)!.valuesArray()!,
						weather_code: hourly.variables(1)!.valuesArray()!,
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
						temperature_2m_max: daily
							.variables(0)!
							.valuesArray() as Float32Array,
						temperature_2m_min: daily
							.variables(1)!
							.valuesArray() as Float32Array,
						weather_code: daily.variables(2)!.valuesArray() as Float32Array,
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
				setLocation({
					city,
					country,
				});
			} catch (err) {
				throw new Error("Something went wrong");
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
						<section className="wrapper grid md:grid-cols-3 md:gap-5">
							<div className=" md:row-1 md:col-span-2">
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
								<DailyForecast weather={weatherData} />
							</div>
							<HourlyForecast weather={weatherData} />
						</section>
					</main>
				)
			)}
		</>
	);
}

export default MainContent;
