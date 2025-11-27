const renderCalculatorHead = () => {
	const calculatorHead = document.createElement("div");
	giveElementClass(calculatorHead, [
		"relative",
		"flex",
		"gap-4",
		"md:gap-6",
		"pt-10",
		"pb-15",
		"border-b-2",
		"border-[hsla(0,1%,44%,20%)]",
	]);
	calculatorHead.innerHTML = `
    <div class="w-full sm:w-[24%] group"><span class="font-bold text-sm tracking-[0.2rem] text-grey-500 group-[.error]:text-red-400">DAY</span>
    <input type="number" placeholder="DD" class="py-3 px-4 rounded-lg font-bold uppercase text-black text-lg md:text-[1.3rem] placeholder:text-grey-500 w-full border border-[hsla(0,1%,44%,50%)] focus:border-purple-500 focus:outline-0 group-[.error]:border-red-400 caret-purple-500 cursor-pointer hover:border-purple-500 transition-colors">
    <span class="error-txt error-txt-main hidden italic text-red-400 font-medium text-xs md:text-sm"></span></div>

    <div class="w-full sm:w-[24%] group"><span class="font-bold text-sm tracking-[0.2rem] text-grey-500 group-[.error]:text-red-400">MONTH</span>
    <input type="number" placeholder="MM" class="py-3 px-4 rounded-lg font-bold uppercase text-black text-lg md:text-[1.3rem] placeholder:text-grey-500 w-full border border-[hsla(0,1%,44%,50%)] focus:border-purple-500 focus:outline-0 group-[.error]:border-red-400 caret-purple-500 cursor-pointer hover:border-purple-500 transition-colors">
    <span class="error-txt hidden italic text-red-400 font-medium text-xs md:text-sm"></span></div>

    <div class="w-full sm:w-[24%] group"><span class="font-bold text-sm tracking-[0.2rem] text-grey-500 group-[.error]:text-red-400">YEAR</span>
    <input type="number" placeholder="YYYY" class="py-3 px-4 rounded-lg font-bold uppercase text-black text-lg md:text-[1.3rem] placeholder:text-grey-500 w-full border border-[hsla(0,1%,44%,50%)] focus:border-purple-500 focus:outline-0 group-[.error]:border-red-400 caret-purple-500 cursor-pointer hover:border-purple-500 transition-colors">
    <span class="error-txt hidden italic text-red-400 font-medium text-xs md:text-sm"></span></div>

    <button class="calculate absolute grid place-items-center w-16 h-16 left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 md:left-[unset] md:translate-x-0 md:right-0 rounded-full bg-purple-500 border-0 md:hover:bg-black md:focus-visible:bg-black md:focus-visible:outline-0 md:active:scale-90 cursor-pointer transition-[background-color,scale]" aria-label="Button that allows you to calculate your age"><img src="./assets/images/icon-arrow.svg" class="w-8 md:w-10"></button>
    `;

	return calculatorHead;
};

const renderCalculatorBody = () => {
	const calculatorBody = document.createElement("div");
	giveElementClass(calculatorBody, ["pb-10", "pt-15"]);

	calculatorBody.innerHTML = `
    <p class="font-black text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] mb-2"><span class="dash inline-block align-middle -skew-x-15 w-5 h-2 sm:w-7 sm:h-3 bg-purple-500 "></span><span class="dash inline-block align-middle -skew-x-15 w-5 h-2 sm:w-7 sm:h-3 bg-purple-500 ml-3"></span><span class="info-year text-purple-500"></span> years</p>
    <p class="font-black text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] mb-2"><span class="dash inline-block align-middle -skew-x-15 w-5 h-2 sm:w-7 sm:h-3 bg-purple-500  "></span><span class="dash inline-block align-middle -skew-x-15 w-5 h-2 sm:w-7 sm:h-3 bg-purple-500 ml-3"></span><span class="info-month text-purple-500"></span> months</p>
    <p class="font-black text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] mb-2"><span class="dash inline-block align-middle -skew-x-15 w-5 h-2 sm:w-7 sm:h-3 bg-purple-500  "></span><span class="dash inline-block align-middle -skew-x-15 w-5 h-2 sm:w-7 sm:h-3 bg-purple-500 ml-3"></span><span class="info-day text-purple-500"></span> days</p>
    `;

	return calculatorBody;
};

export const renderCalculator = () => {
	const calculator = document.createElement("div");
	giveElementClass(calculator, [
		"max-w-2xl",
		"mx-3",
		"px-5",
		"bg-white",
		"rounded-2xl",
		"rounded-br-[25%]",
		"md:mx-auto",
		"md:px-8",
		"shadow-md",
	]);

	calculator.append(renderCalculatorHead(), renderCalculatorBody());

	return calculator;
};

export const giveElementClass = (element: Element, classes: string[]) => {
	classes.forEach((cls) => {
		element.classList.add(cls);
	});
};
