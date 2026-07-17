import Header from "../Header.tsx";
import WeatherHero from "../MainContent/WeatherHero.tsx";
import WeatherHeroStats from "../MainContent/WeatherHeroStats.tsx";
import { fetchWeatherApi } from "openmeteo";
import { useEffect, useState } from "react";

type WeatherData = {
	current: {
		time: Date;
		relative_humidity_2m: number;
		apparent_temperature: number;
		temperature_2m: number;
		precipitation: number;
		wind_speed_10m: number;
	};
	hourly: {
		time: Date[];
		temperature_2m: Float32Array | null;
		relative_humidity_2m: Float32Array | null;
	};
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
					hourly: ["temperature_2m", "relative_humidity_2m"],
					current: [
						"relative_humidity_2m",
						"apparent_temperature",
						"temperature_2m",
						"precipitation",
						"wind_speed_10m",
						"cloud_cover",
						"rain",
						"snowfall",
					],
				};
				const url = "https://api.open-meteo.com/v1/forecast";
				const responses = await fetchWeatherApi(url, params);

				const response = responses[0];
				const utcOffsetSeconds = response.utcOffsetSeconds();

				const current = response.current()!;
				const hourly = response.hourly()!;

				const weatherData = {
					current: {
						time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
						relative_humidity_2m: current.variables(0)!.value(),
						apparent_temperature: current.variables(1)!.value(),
						temperature_2m: current.variables(2)!.value(),
						precipitation: current.variables(3)!.value(),
						wind_speed_10m: current.variables(4)!.value(),
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
				};
				setWeatherData(weatherData);
				console.log(weatherData);
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

			<section className="wrapper">
				<div>
					{weatherData && (
						<WeatherHero
							city={location && location.city}
							country={location && location.country}
							temperature={Math.round(weatherData.current.apparent_temperature)}
						/>
					)}
					{weatherData && (
						<WeatherHeroStats
							precipitation={Math.round(weatherData.current.precipitation)}
							humidity={Math.round(weatherData.current.relative_humidity_2m)}
							temperature={Math.round(weatherData.current.temperature_2m)}
							wind={Math.round(weatherData.current.wind_speed_10m)}
						/>
					)}
				</div>
			</section>
		</>
	);
}

export default MainContent;
