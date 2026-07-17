import logo from "/src/assets/logo.svg";
import settingsIcon from "/src/assets/icon-units.svg";
import iconDropdown from "/src/assets/icon-dropdown.svg";
import { useEffect, useRef, useState } from "react";
export default function Controls() {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutsideDropdown = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("click", handleClickOutsideDropdown);
		return () => {
			document.removeEventListener("click", handleClickOutsideDropdown);
		};
	}, []);

	return (
		<nav className="wrapper py-5">
			<div
				ref={dropdownRef}
				className="relative flex items-center justify-between">
				<img width={160} src={logo} alt="Weather Now's logo" />
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="py-2 px-4 gap-2 rounded-lg flex text-(--neutral) bg-(--veryDarkGray) hover:bg-(--darkerGray) transition-colors duration-300">
					<img width={16} src={settingsIcon} alt="" /> Units{" "}
					<img width={14} src={iconDropdown} alt="" />
				</button>
				{isOpen && (
					<div className="dropdown min-w-50 flex flex-col gap-2 items-start p-2 absolute right-0 -bottom-2 translate-y-full rounded-lg bg-(--veryDarkGray) text-(--neutral) text-[0.95rem] border border-(--lighterGray)/20 z-100">
						<button className="p-2 w-full text-left rounded-lg hover:bg-(--darkerGray) transition-colors duration-300 border border-transparent focus-visible:outline-none focus-visible:border-(--neutral)">
							Switch to Imperial
						</button>
						<p className="px-2 text-(--lightGray)">Temperature</p>
						<button className="p-2 w-full text-left rounded-lg hover:bg-(--darkerGray) transition-colors duration-300 border border-transparent focus-visible:outline-none focus-visible:border-(--neutral)">
							Celsius (°C)
						</button>
						<button className="p-2 w-full text-left rounded-lg hover:bg-(--darkerGray) transition-colors duration-300 border border-transparent focus-visible:outline-none focus-visible:border-(--neutral)">
							Fahrenheit (°F)
						</button>
						<hr className="w-full border-(--lighterGray)/20" />
						<p className="px-2 text-(--lightGray)">Wind Speed</p>
						<button className="p-2 w-full text-left rounded-lg hover:bg-(--darkerGray) transition-colors duration-300 border border-transparent focus-visible:outline-none focus-visible:border-(--neutral)">
							km/h
						</button>
						<button className="p-2 w-full text-left rounded-lg hover:bg-(--darkerGray) transition-colors duration-300 border border-transparent focus-visible:outline-none focus-visible:border-(--neutral)">
							mph
						</button>
						<hr className="w-full border-(--lighterGray)/20" />
						<p className="px-2 text-(--lightGray)">Precipitation</p>
						<button className="p-2 w-full text-left rounded-lg hover:bg-(--darkerGray) transition-colors duration-300 border border-transparent focus-visible:outline-none focus-visible:border-(--neutral)">
							Millimeters (mm)
						</button>
						<button className="p-2 w-full text-left rounded-lg hover:bg-(--darkerGray) transition-colors duration-300 border border-transparent focus-visible:outline-none focus-visible:border-(--neutral)">
							Inches (in)
						</button>
					</div>
				)}
			</div>
		</nav>
	);
}
