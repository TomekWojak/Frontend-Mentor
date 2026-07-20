import Header from "../Header.tsx";
import WeatherHero from "../MainContent/WeatherHero.tsx";
import WeatherHeroStats from "../MainContent/WeatherHeroStats.tsx";
import SkeletonLoading from "../MainContent/SkeletonLoading.tsx";
import iconError from "../../assets/icon-error.svg";
import DailyForecast from "../MainContent/DailyForecast.tsx";
import HourlyForecast from "../MainContent/HourlyForecast.tsx";
import { getWeatherIcon } from "../MainContent/MappedIcon.tsx";
import { fetchWeatherApi } from "openmeteo";
import { useEffect, useState } from "react";
import type { WeatherData, LocationData } from "../../types/weather.ts";
import type { MainContentProps } from "../../types/units.ts";

function MainContent({
	temperatureUnit,
	windUnit,
	precipitationUnit,
}: MainContentProps) {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [location, setLocation] = useState<LocationData | null>(null);

	const fetchWeather = async (latitude: number, longitude: number) => {
		try {
			setIsLoading(true);

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
					"weather_code",
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
					temperature_2m_max: daily.variables(0)!.valuesArray() as Float32Array,
					temperature_2m_min: daily.variables(1)!.valuesArray() as Float32Array,
					weather_code: daily.variables(2)!.valuesArray() as Float32Array,
				},
			};

			setWeatherData(weatherData);
		} catch (err) {
			console.log("Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const fetchWeatherForUserLocation = async () => {
			try {
				if (!navigator.geolocation) {
					throw new Error("Geolocation is not supported");
				}

				const position = await new Promise<GeolocationPosition>(
					(resolve, reject) => {
						navigator.geolocation.getCurrentPosition(resolve, reject);
					},
				);

				const { latitude, longitude } = position.coords;

				await fetchWeather(latitude, longitude);

				const locationData = await getLocationName(latitude, longitude);
				setLocation(locationData);
			} catch (err) {
				console.log("");
				setIsLoading(false);
			}
		};

		fetchWeatherForUserLocation();
	}, []);

	const getLocationName = async (
		latitude: number,
		longitude: number,
	): Promise<LocationData> => {
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
	};

	const handleCitySelect = async (latitude: number, longitude: number) => {
		try {
			setIsLoading(true);

			const locationData = await getLocationName(latitude, longitude);

			setLocation(locationData);
			console.log(locationData);

			await fetchWeather(latitude, longitude);
		} catch (err) {
			console.error("Nie udało się zmienić miasta:", err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Header onCitySelect={handleCitySelect} />

			{isLoading ? (
				<SkeletonLoading />
			) : weatherData ? (
				<main className="pb-5">
					<section className="wrapper grid md:grid-cols-3 md:gap-5">
						<div className="md:row-1 md:col-span-2">
							<WeatherHero
								temperatureUnit={temperatureUnit}
								city={location && location.city}
								country={location && location?.country}
								temperature={Math.round(
									weatherData.current.apparent_temperature,
								)}
								iconRef={getWeatherIcon(weatherData.current.weather_code)}
							/>

							<WeatherHeroStats
								temperatureUnit={temperatureUnit}
								windUnit={windUnit}
								precipitationUnit={precipitationUnit}
								precipitation={Math.round(weatherData.current.precipitation)}
								humidity={Math.round(weatherData.current.relative_humidity_2m)}
								temperature={Math.round(weatherData.current.temperature_2m)}
								wind={Math.round(weatherData.current.wind_speed_10m)}
							/>

							<DailyForecast
								temperatureUnit={temperatureUnit}
								weather={weatherData}
							/>
						</div>

						<HourlyForecast
							temperatureUnit={temperatureUnit}
							weather={weatherData}
						/>
					</section>
				</main>
			) : (
				<div className="flex flex-col items-center text-center">
					<img width={30} src={iconError} alt="" />
					<p className="text-(--neutral) text-[2rem] font-semibold">
						Something went wrong
					</p>
					<p className="text-(--neutral)/80">
						We couldn't connect to the server (API error). Please try searching
						for another city again in few moment
					</p>
				</div>
			)}
		</>
	);
}

export default MainContent;
