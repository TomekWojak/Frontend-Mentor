export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindUnit = "kmh" | "mph";
export type PrecipitationUnit = "mm" | "inch";

export type ControlsProps = {
	temperatureUnit: TemperatureUnit;
	windUnit: WindUnit;
	precipitationUnit: PrecipitationUnit;

	onTemperatureUnitChange: (unit: TemperatureUnit) => void;
	onWindUnitChange: (unit: WindUnit) => void;
	onPrecipitationUnitChange: (unit: PrecipitationUnit) => void;
};
export type MainContentProps = {
	temperatureUnit: TemperatureUnit;
	windUnit: WindUnit;
	precipitationUnit: PrecipitationUnit;
};