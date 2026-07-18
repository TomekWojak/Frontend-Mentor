import iconDropdown from "../../assets/icon-dropdown.svg";

function SkeletonLoading() {
	return (
		<div className="grid wrapper md:grid-cols-3 md:gap-5">
			<div className="weather-stats md:row-1 md:col-span-2">
				<div className="hero overflow-hidden relative skeleton bg-(--veryDarkGray) px-6 py-20 rounded-2xl text-center">
					<div className="loading-dots flex justify-center gap-2 mb-2">
						<span className="block w-2 h-2 rounded-full bg-(--neutral) animate-[dotsLoading_1.5s_infinite]"></span>
						<span className="block w-2 h-2 rounded-full bg-(--neutral) animate-[dotsLoading_1.5s_infinite] [animation-delay:200ms]"></span>
						<span className="block w-2 h-2 rounded-full bg-(--neutral) animate-[dotsLoading_1.5s_infinite] (--neutral) [animation-delay:400ms]"></span>
					</div>
					<span className="text-(--neutral) text-sm">Loading...</span>
				</div>
				<div className="weather-small-stats grid grid-cols-2 mt-5 gap-3 sm:grid-cols-4">
					<div className="stats-ceil relative skeleton flex flex-col items-start gap-4 p-3 text-(--neutral) bg-(--veryDarkGray) border border-(--lighterGray)/20 rounded-lg">
						<span className="text-(--neutral)/90 text-md">Feels Like</span>
						<span className="text-2xl">−</span>
					</div>
					<div className="stats-ceil relative skeleton flex flex-col items-start gap-4 p-3 text-(--neutral) bg-(--veryDarkGray) border border-(--lighterGray)/20 rounded-lg">
						<span className="text-(--neutral)/90 text-md">Humidity</span>
						<span className="text-2xl">−</span>
					</div>
					<div className="stats-ceil relative skeleton flex flex-col items-start gap-4 p-3 text-(--neutral) bg-(--veryDarkGray) border border-(--lighterGray)/20 rounded-lg">
						<span className="text-(--neutral)/90 text-md">Wind</span>
						<span className="text-2xl">−</span>
					</div>
					<div className="stats-ceil relative skeleton flex flex-col items-start gap-4 p-3 text-(--neutral) bg-(--veryDarkGray) border border-(--lighterGray)/20 rounded-lg">
						<span className="text-(--neutral)/90 text-md">Precipitation</span>
						<span className="text-2xl">−</span>
					</div>
				</div>

				<div className="daily-forecast mt-7">
					<p className="text-(--neutral) mb-4">Daily forecast</p>
					<div className="daily-forecast-ceils grid grid-cols-[repeat(auto-fit,minmax(90px,1fr))] gap-3">
						<div className="h-35 bg-(--veryDarkGray) border border-(--lighterGray)/20 rounded-lg relative skeleton"></div>
						<div className="h-35 bg-(--veryDarkGray) border border-(--lighterGray)/20 rounded-lg relative skeleton"></div>
						<div className="h-35 bg-(--veryDarkGray) border border-(--lighterGray)/20 rounded-lg relative skeleton"></div>
						<div className="h-35 bg-(--veryDarkGray) border border-(--lighterGray)/20 rounded-lg relative skeleton"></div>
						<div className="h-35 bg-(--veryDarkGray) border border-(--lighterGray)/20 rounded-lg relative skeleton"></div>
						<div className="h-35 bg-(--veryDarkGray) border border-(--lighterGray)/20 rounded-lg relative skeleton"></div>
						<div className="h-35 bg-(--veryDarkGray) border border-(--lighterGray)/20 rounded-lg relative skeleton"></div>
					</div>
				</div>
			</div>
			<div className="hourly-forecast text-(--neutral) bg-(--veryDarkGray) rounded-2xl p-3 mt-6 md:row-1 md:col-3 md:mt-0">
				<div className="top flex justify-between items-center mb-3">
					<p>Hourly forecast</p>
					<div className="flex gap-2 bg-(--darkerGray) w-fit px-3 py-0.5 rounded-md hover:bg-(--lightGray)/20 transition-colors duration-300">
						− <img src={iconDropdown} alt="" />
					</div>
				</div>
				<div className="bottom flex flex-col gap-3">
					<div className="p-5.5 bg-(--darkerGray) border border-(--lighterGray)/20 rounded-md relative skeleton"></div>
					<div className="p-5.5 bg-(--darkerGray) border border-(--lighterGray)/20 rounded-md relative skeleton"></div>
					<div className="p-5.5 bg-(--darkerGray) border border-(--lighterGray)/20 rounded-md relative skeleton"></div>
					<div className="p-5.5 bg-(--darkerGray) border border-(--lighterGray)/20 rounded-md relative skeleton"></div>
					<div className="p-5.5 bg-(--darkerGray) border border-(--lighterGray)/20 rounded-md relative skeleton"></div>
					<div className="p-5.5 bg-(--darkerGray) border border-(--lighterGray)/20 rounded-md relative skeleton"></div>
					<div className="p-5.5 bg-(--darkerGray) border border-(--lighterGray)/20 rounded-md relative skeleton"></div>
					<div className="p-5.5 bg-(--darkerGray) border border-(--lighterGray)/20 rounded-md relative skeleton"></div>
				</div>
			</div>
		</div>
	);
}

export default SkeletonLoading;
