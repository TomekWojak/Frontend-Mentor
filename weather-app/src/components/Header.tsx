import { useState, useRef, useEffect } from "react";
import searchIcon from "/src/assets/icon-search.svg";
import loadingIcon from "/src/assets/icon-loading.svg";

type City = {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
};

function Header() {
	const [isSearching, setIsSearching] = useState(false);
	const [citiesLoading, setCitiesLoading] = useState(false);
	const [cities, setCities] = useState<City[]>([]);
	const [value, setValue] = useState("");
	const searchResultsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutsideResults = (e: MouseEvent) => {
			if (
				searchResultsRef.current &&
				!searchResultsRef.current.contains(e.target as Node)
			) {
				setIsSearching(false);
			}
		};
		document.addEventListener("click", handleClickOutsideResults);
		return () => {
			document.removeEventListener("click", handleClickOutsideResults);
		};
	}, []);

	const searchByCityName = async () => {
		if (value === "") return;

		try {
			setIsSearching(true);
			setCitiesLoading(true);
			const response = await fetch(
				`https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=3&language=en&format=json`,
			);
			const data = await response.json();

			if (data) {
				setCities(data.results ?? []);
				console.log(data.results);
			}
		} catch (err) {
			throw new Error("Cannot fetch cities data");
		} finally {
			setCitiesLoading(false);
		}
	};

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
					<div
						ref={searchResultsRef}
						className="searching-results absolute gap-2 items-start p-2 w-full -bottom-2 translate-y-full rounded-lg bg-(--veryDarkGray) flex flex-col z-100 border border-(--lighterGray)/20">
						{cities.length !== 0 ? (
							cities.map(({ name, id, latitude, longitude }) => (
								<button
									key={id}
									data-lat={latitude}
									data-long={longitude}
									className="p-1.5 w-full cursor-pointer border border-transparent hover:border-(--lighterGray)/20 transition-[background-color,border] duration-300 rounded-md hover:bg-(--darkerGray) text-left focus-visible:outline-0 focus-visible:border-(--neutral)">
									{name}
								</button>
							))
						) : (
							<p className="self-center">
								No search results, correct the spelling
							</p>
						)}
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
				<div className="relative text-(--neutral) sm:flex-1 sm:max-w-130">
					<input
						value={value}
						onChange={(e) => setValue(e.currentTarget.value)}
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
				<button
					onClick={searchByCityName}
					className="rounded-lg py-2.5 sm:py-3 px-4 text-(--neutral) bg-(--lightBlue) hover:bg-(--darkBlue) cursor-pointer transition-[background-color] duration-300 focus-visible:outline-(--lightBlue) outline-offset-2 outline-0 focus-visible:outline-2">
					Search
				</button>
			</div>
		</header>
	);
}

export default Header;
