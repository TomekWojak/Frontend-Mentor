import heroSmall from "../../assets/bg-today-small.svg";
import heroLarge from "../../assets/bg-today-large.svg";
import type { TemperatureUnit } from "../../types/units.ts";

type heroData = {
	temperatureUnit: TemperatureUnit;
	city: string | null;
	country: string | null;
	temperature: number;
	iconRef: string;
};

function WeatherHero({
	temperatureUnit,
	city,
	country,
	temperature,
	iconRef,
}: heroData) {
	const todayDate = new Date();
	const formattedDate = todayDate.toLocaleDateString("en-US", {
		weekday: "long",
		month: "short",
		day: "numeric",
		year: "numeric",
	});
	return (
		<div className="relative overflow-hidden rounded-2xl text-(--neutral)">
			<img
				src={heroSmall}
				alt=""
				aria-hidden="true"
				className="absolute inset-0 size-full object-cover sm:hidden"
			/>

			<img
				src={heroLarge}
				alt=""
				aria-hidden="true"
				className="absolute inset-0 hidden size-full object-cover sm:block"
			/>

			<div className="relative z-10 p-6 sm:flex sm:py-15 sm:justify-between sm:items-center text-center sm:text-left">
				<div>
					<p className="city text-xl font-semibold sm:text-2xl">
						{city && country && `${city}, ${country}`}
					</p>
					<span className="text-(--neutral)/80 text-sm">{formattedDate}</span>
				</div>
				<div className="flex items-center justify-center gap-4">
					<img width={100} src={iconRef} alt="" />
					<span className="text-[4.5rem] font-bold">
						{temperatureUnit === "celsius"
							? `${temperature}°`
							: `${Math.round(temperature * 1.8 + 32)}°F`}
					</span>
				</div>
			</div>
		</div>
	);
}

export default WeatherHero;
