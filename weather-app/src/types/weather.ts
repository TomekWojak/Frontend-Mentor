export type CurrentWeather = {
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

export type HourlyWeather = {
	time: Date[];
	temperature_2m: Float32Array;
	weather_code: Float32Array;
};

export type DailyWeather = {
	time: Date[];
	temperature_2m_max: Float32Array;
	temperature_2m_min: Float32Array;
	weather_code: Float32Array;
};

export type WeatherData = {
	current: CurrentWeather;
	hourly: HourlyWeather;
	daily: DailyWeather;
};
export type LocationData = {
	city: string;
	country: string;
};

export type DailyForecastProps = {
	weather: WeatherData;
};
