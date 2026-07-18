import sunnyIcon from "../../assets/icon-sunny.webp";
import cloudyIcon from "../../assets/icon-overcast.webp";
import rainIcon from "../../assets/icon-rain.webp";
import snowIcon from "../../assets/icon-snow.webp";
import stormIcon from "../../assets/icon-storm.webp";
import fogIcon from "../../assets/icon-fog.webp";
import drizzleIcon from "../../assets/icon-drizzle.webp";
import partCloudyIcon from "../../assets/icon-partly-cloudy.webp";

export function getWeatherIcon(code: number) {
	switch (code) {
		case 0:
			return sunnyIcon;

		case 1:
		case 2:
			return partCloudyIcon;

		case 3:
			return cloudyIcon;

		case 45:
		case 48:
			return fogIcon;

		case 51:
		case 53:
		case 55:
		case 56:
		case 57:
			return drizzleIcon;

		case 61:
		case 63:
		case 65:
		case 66:
		case 67:
		case 80:
		case 81:
		case 82:
			return rainIcon;

		case 71:
		case 73:
		case 75:
		case 77:
		case 85:
		case 86:
			return snowIcon;

		case 95:
		case 96:
		case 99:
			return stormIcon;

		default:
			return cloudyIcon;
	}
}

export default getWeatherIcon;
