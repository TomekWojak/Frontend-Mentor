import { renderCalculator } from "./components.js";
const currentYear = new Date().getFullYear();

const addErrorState = (box: HTMLElement) => {
	box.classList.add("error");
};
const removeErrorState = (box: HTMLElement) => {
	box.classList.remove("error");
};
const showErrorTxt = (
	txt: HTMLElement,
	season: string,
	isEmpty: boolean,
	value: string,
	isShorter: boolean
) => {
	txt.classList.remove("hidden");
	if (isEmpty) {
		txt.textContent = "This field is required";
		return;
	}

	if (season === "year" && parseInt(value) > currentYear) {
		txt.textContent = "Must be in the past";
		return;
	}

	if (isShorter) {
		txt.textContent = "Must be a valid date";
		return;
	}
	txt.textContent = `Must be a valid ${season}`;
};
const hideErrorTxt = (txt: HTMLElement) => {
	txt.textContent = "";
	txt.classList.add("hidden");
};
const handleInputs = () => {
	const inputs = document.querySelectorAll<HTMLInputElement>(
		'input[type="number"]'
	);

	if (inputs.length === 0) {
		console.error("No input elements found");
		return;
	}

	inputs.forEach((input, index, inputs) => {
		const dayRegExp = /^(0[1-9]|[1-9]|[12][0-9]|3[01])$/;
		const monthRegExp = /^(0?[1-9]|1[0-2])$/;
		const yearRegExp = /^(19[0-9]{2}|20[0-1][0-9]|202[0-5])$/;

		const value = input.value.trim();
		const parent = input.closest<HTMLElement>(".group");
		const errorTxt = input.nextElementSibling;
		const season =
			input.previousElementSibling?.textContent.toLowerCase() ?? "";

		let isEmpty = false;
		let isValid = false;
		let isShorter = false;

		if (!parent) return;
		if (!(errorTxt instanceof HTMLElement)) return;

		addErrorState(parent);

		if (value === "") {
			isEmpty = true;
			showErrorTxt(errorTxt, season, isEmpty, value, false);
			return;
		}
		switch (season) {
			case "day":
				isValid = dayRegExp.test(value);
				break;
			case "month":
				isValid = monthRegExp.test(value);
				isShorter = checkIfShorter(value, [...inputs]);
				const mainErrorTxt =
					document.querySelector<HTMLElement>(".error-txt-main");

				if (!mainErrorTxt) return;

				if (isShorter && isValid) {
					showErrorTxt(mainErrorTxt, season, isEmpty, value, isShorter);
				}

				break;
			case "year":
				isValid = yearRegExp.test(value);
				break;
		}

		if (!isValid) {
			showErrorTxt(errorTxt, season, isEmpty, value, false);
			return;
		}
		removeErrorState(parent);
		hideErrorTxt(errorTxt);
	});
	checkForErrors();
};
const checkForErrors = () => {
	const boxes = [...document.querySelectorAll<HTMLElement>(".group")];

	if (boxes.length === 0) return;
	const errorBoxes = boxes.filter((box) => box.classList.contains("error"));

	if (errorBoxes.length !== 0) return;

	calculateAge();
};

const calculateAge = () => {
	const allDashes = document.querySelectorAll(".dash");
	const infoDay = document.querySelector(".info-day");
	const infoMonth = document.querySelector(".info-month");
	const infoYear = document.querySelector(".info-year");

	const dayInput = document.querySelector<HTMLInputElement>(
		'input[placeholder="DD"]'
	);
	const monthInput = document.querySelector<HTMLInputElement>(
		'input[placeholder="MM"]'
	);
	const yearInput = document.querySelector<HTMLInputElement>(
		'input[placeholder="YYYY"]'
	);
	if (
		!dayInput ||
		!monthInput ||
		!yearInput ||
		!infoDay ||
		!infoMonth ||
		!infoYear
	)
		return;

	const day = Number(dayInput.value);
	const month = Number(monthInput.value);
	const year = Number(yearInput.value);
	const currDate = new Date();

	const years = Math.abs(currDate.getFullYear() - year);
	const months = Math.abs(currDate.getMonth() - month);
	const days = Math.abs(currDate.getDate() - day);

	allDashes?.forEach((dash) => dash.remove());

	infoDay.textContent = `${days}`;
	infoMonth.textContent = `${months}`;
	infoYear.textContent = `${years}`;
};

const checkIfShorter = (month: string, inputs: HTMLInputElement[]) => {
	const dayInputValue = inputs.find(
		(input) => input.placeholder === "DD"
	)?.value;
	const yearInputValue = inputs.find(
		(input) => input.placeholder === "YYYY"
	)?.value;

	if (!dayInputValue || !yearInputValue) return false;

	const allBoxes = document.querySelectorAll(".group");
	let maxDate = 30;
	let isLeap = checkIfLeapYear(yearInputValue);

	let daysOfFeb = isLeap ? 29 : 28;

	if (
		(month === "2" || month === "02") &&
		parseInt(dayInputValue) > daysOfFeb
	) {
		allBoxes.forEach((box) => box.classList.add("error"));
		return true;
	}
	if (
		(month === "4" ||
			month === "04" ||
			month === "6" ||
			month === "06" ||
			month === "9" ||
			month === "09" ||
			month === "11") &&
		parseInt(dayInputValue) > maxDate
	) {
		allBoxes.forEach((box) => box.classList.add("error"));
		return true;
	}

	return false;
};

const checkIfLeapYear = (year: string) => {
	const parsedYear = parseInt(year);
	return (
		(parsedYear % 4 == 0 && parsedYear % 100 != 0) || parsedYear % 400 == 0
	);
};

document.addEventListener("DOMContentLoaded", function () {
	document.body.append(renderCalculator());
	document
		.querySelector<HTMLButtonElement>(".calculate")
		?.addEventListener("click", handleInputs);
});
