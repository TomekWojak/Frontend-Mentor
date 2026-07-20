import logo from "/src/assets/logo.svg";
import settingsIcon from "/src/assets/icon-units.svg";
import iconDropdown from "/src/assets/icon-dropdown.svg";
import iconChecked from "/src/assets/icon-checkmark.svg";
import { useEffect, useRef, useState } from "react";
import type { ControlsProps } from "../types/units.ts";

export default function Controls({
	temperatureUnit,
	windUnit,
	precipitationUnit,
	onTemperatureUnitChange,
	onWindUnitChange,
	onPrecipitationUnitChange,
}: ControlsProps) {
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

	const switchToImperialUnits = () => {
		onTemperatureUnitChange("fahrenheit");
		onWindUnitChange("mph");
		onPrecipitationUnitChange("inch");
	};

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
						<button
							onClick={switchToImperialUnits}
							className="p-2 w-full text-left rounded-lg hover:bg-(--darkerGray) transition-colors duration-300 border border-transparent focus-visible:outline-none focus-visible:border-(--neutral)">
							Switch to Imperial
						</button>
						<p className="px-2 text-(--lightGray)">Temperature</p>
						<button
							onClick={() => onTemperatureUnitChange("celsius")}
							className={`${temperatureUnit === "celsius" ? "bg-(--darkerGray)" : ""} flex justify-between items-center p-2 w-full text-left rounded-lg hover:bg-(--darkerGray) transition-colors duration-300 border border-transparent focus-visible:outline-none focus-visible:border-(--neutral)`}>
							Celsius (°C)
							<img
								className={`${temperatureUnit === "celsius" ? "block" : "hidden"}`}
								src={iconChecked}
								alt=""
							/>
						</button>
						<button
							onClick={() => onTemperatureUnitChange("fahrenheit")}
							className={`${temperatureUnit === "fahrenheit" ? "bg-(--darkerGray)" : ""} flex justify-between items-center p-2 w-full text-left rounded-lg hover:bg-(--darkerGray) transition-colors duration-300 border border-transparent focus-visible:outline-none focus-visible:border-(--neutral)`}>
							Fahrenheit (°F)
							<img
								className={`${temperatureUnit === "fahrenheit" ? "block" : "hidden"}`}
								src={iconChecked}
								alt=""
							/>
						</button>
						<hr className="w-full border-(--lighterGray)/20" />
						<p className="px-2 text-(--lightGray)">Wind Speed</p>
						<button
							onClick={() => onWindUnitChange("kmh")}
							className={`${windUnit === "kmh" ? "bg-(--darkerGray)" : ""} flex justify-between items-center p-2 w-full text-left rounded-lg hover:bg-(--darkerGray) transition-colors duration-300 border border-transparent focus-visible:outline-none focus-visible:border-(--neutral)`}>
							kmh
							<img
								className={`${windUnit === "kmh" ? "block" : "hidden"}`}
								src={iconChecked}
								alt=""
							/>
						</button>
						<button
							onClick={() => onWindUnitChange("mph")}
							className={`${windUnit === "mph" ? "bg-(--darkerGray)" : ""} flex justify-between items-center p-2 w-full text-left rounded-lg hover:bg-(--darkerGray) transition-colors duration-300 border border-transparent focus-visible:outline-none focus-visible:border-(--neutral)`}>
							mph
							<img
								className={`${windUnit === "mph" ? "block" : "hidden"}`}
								src={iconChecked}
								alt=""
							/>
						</button>
						<hr className="w-full border-(--lighterGray)/20" />
						<p className="px-2 text-(--lightGray)">Precipitation</p>
						<button
							onClick={() => onPrecipitationUnitChange("mm")}
							className={`${precipitationUnit === "mm" ? "bg-(--darkerGray)" : ""} flex justify-between items-center p-2 w-full text-left rounded-lg hover:bg-(--darkerGray) transition-colors duration-300 border border-transparent focus-visible:outline-none focus-visible:border-(--neutral)`}>
							Milimeters (mm)
							<img
								className={`${precipitationUnit === "mm" ? "block" : "hidden"}`}
								src={iconChecked}
								alt=""
							/>
						</button>
						<button
							onClick={() => onPrecipitationUnitChange("inch")}
							className={`${precipitationUnit === "inch" ? "bg-(--darkerGray)" : ""} flex justify-between items-center p-2 w-full text-left rounded-lg hover:bg-(--darkerGray) transition-colors duration-300 border border-transparent focus-visible:outline-none focus-visible:border-(--neutral)`}>
							Inches (in)
							<img
								className={`${precipitationUnit === "inch" ? "block" : "hidden"}`}
								src={iconChecked}
								alt=""
							/>
						</button>
					</div>
				)}
			</div>
		</nav>
	);
}
