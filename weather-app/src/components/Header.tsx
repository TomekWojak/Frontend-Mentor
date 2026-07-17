import { useState } from "react";
import searchIcon from "/src/assets/icon-search.svg";
import loadingIcon from "/src/assets/icon-loading.svg";

function Header() {
	const [isSearching, setIsSearching] = useState(false);
	const [citiesLoading, setCitiesLoading] = useState(true);

	const SearchingArea = () => {
		return (
			<>
				{citiesLoading ? (
					<div className="searching-in-progress flex gap-3 absolute p-2.5 w-full -bottom-2 translate-y-full rounded-lg bg-(--veryDarkGray) z-10">
						<img
							src={loadingIcon}
							alt=""
							className="animate-spin [animation-duration:850ms]"
						/>
						<span>Search in progress</span>
					</div>
				) : (
					<div className="searching-results absolute gap-2 items-start p-2 w-full -bottom-2 translate-y-full rounded-lg bg-(--veryDarkGray) flex flex-col z-10">
						{/* tutaj będę iterował po tablicy znalezionych miast */}
						<button className="p-1.5 w-full cursor-pointer border border-transparent hover:border-(--lighterGray)/20 transition-[background-color,border] duration-300 rounded-md hover:bg-(--darkerGray) text-left focus-visible:outline-0 focus-visible:border-(--neutral)">
							City Name
						</button>
						<button className="p-1.5 w-full cursor-pointer border border-transparent hover:border-(--lighterGray)/20 transition-[background-color,border] duration-300 rounded-md hover:bg-(--darkerGray) text-left focus-visible:outline-0 focus-visible:border-(--neutral)">
							City Name
						</button>
						<button className="p-1.5 w-full cursor-pointer border border-transparent hover:border-(--lighterGray)/20 transition-[background-color,border] duration-300 rounded-md hover:bg-(--darkerGray) text-left focus-visible:outline-0 focus-visible:border-(--neutral)">
							City Name
						</button>
						<button className="p-1.5 w-full cursor-pointer border border-transparent hover:border-(--lighterGray)/20 transition-[background-color,border] duration-300 rounded-md hover:bg-(--darkerGray) text-left focus-visible:outline-0 focus-visible:border-(--neutral)">
							City Name
						</button>
						<button className="p-1.5 w-full cursor-pointer border border-transparent hover:border-(--lighterGray)/20 transition-[background-color,border] duration-300 rounded-md hover:bg-(--darkerGray) text-left focus-visible:outline-0 focus-visible:border-(--neutral)">
							City Name
						</button>
					</div>
				)}
			</>
		);
	};

	return (
		<header className="wrapper py-8">
			<h1 className="mb-8 text-(--neutral) text-center font-(family-name:--font-grotesque) font-semibold tracking-wide text-[2.5rem] md:text-[3rem]">
				How's the sky looking today?
			</h1>
			<div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
				<div className="relative text-(--neutral) sm:flex-1 max-w-130">
					<input
						type="text"
						placeholder="Search for a place"
						className="bg-(--veryDarkGray) rounded-lg py-2.5 sm:py-3 pl-12 pr-4 w-full border border-transparent focus-visible:outline-none focus-visible:border-(--neutral) transition-[background-color] duration-300 hover:bg-(--darkerGray) placeholder:text-(--neutral)/75"
					/>
					<img
						width={18}
						src={searchIcon}
						alt=""
						className="absolute top-1/2 -translate-y-1/2 left-3"
					/>
					{isSearching && <SearchingArea />}
				</div>
				<button className="rounded-lg py-2.5 sm:py-3 px-4 text-(--neutral) bg-(--lightBlue) hover:bg-(--darkBlue) cursor-pointer transition-[background-color] duration-300 focus-visible:outline-(--lightBlue) outline-offset-2 outline-0 focus-visible:outline-2">
					Search
				</button>
			</div>
		</header>
	);
}

export default Header;
