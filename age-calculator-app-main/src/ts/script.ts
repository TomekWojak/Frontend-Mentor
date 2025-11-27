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
	value: string
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

	inputs.forEach((input) => {
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

		if (!parent) return;
		if (!(errorTxt instanceof HTMLElement)) return;

		addErrorState(parent);

		if (value === "") {
			isEmpty = true;
			showErrorTxt(errorTxt, season, isEmpty, value);
			return;
		}
		switch (season) {
			case "day":
				isValid = dayRegExp.test(value);
				break;
			case "month":
				isValid = monthRegExp.test(value);
				break;
			case "year":
				isValid = yearRegExp.test(value);
				break;
		}

		if (!isValid) {
			showErrorTxt(errorTxt, season, isEmpty, value);
			return;
		}
		removeErrorState(parent);
		hideErrorTxt(errorTxt);
	});
};

document.addEventListener("DOMContentLoaded", function () {
	document.body.append(renderCalculator());
	document
		.querySelector<HTMLButtonElement>(".calculate")
		?.addEventListener("click", handleInputs);
});
