export const renderCalculatorHead = () => {
	const calculatorHead = document.createElement("div");
	giveElementClass(calculatorHead, [
		"flex",
		"gap-4",
		"py-5",
		"border-b-2",
		"border-[hsla(0,1%,44%,50%)]",
	]);
	calculatorHead.innerHTML = `
    <div class="w-full group"><span class="font-bold text-sm tracking-[0.2rem] text-grey-500 group-[.error]:text-red-400">DAY</span>
    <input type="number" placeholder="DD" class="py-3 px-2.5 rounded-lg font-bold uppercase text-black text-lg md:text-2xl placeholder:text-grey-500 w-full border border-[hsla(0,1%,44%,50%)] focus:border-purple-500 focus:outline-0 group-[.error]:border-red-400">
    <span class="italic text-red-400 font-light text-xs md:text-sm">Must be a valid day</span></div>

    <div class="w-full group"><span class="font-bold text-sm tracking-[0.2rem] text-grey-500 group-[.error]:text-red-400">MONTH</span>
    <input type="number" placeholder="MM" class="py-3 px-2.5 rounded-lg font-bold uppercase text-black text-lg md:text-2xl placeholder:text-grey-500 w-full border border-[hsla(0,1%,44%,50%)] focus:border-purple-500 focus:outline-0 group-[.error]:border-red-400">
    <span class="italic text-red-400 font-light text-xs md:text-sm">Must be a valid day</span></div>

    <div class="w-full group"><span class="font-bold text-sm tracking-[0.2rem] text-grey-500 group-[.error]:text-red-400">YEAR</span>
    <input type="number" placeholder="YYYY" class="py-3 px-2.5 rounded-lg font-bold uppercase text-black text-lg md:text-2xl placeholder:text-grey-500 w-full border border-[hsla(0,1%,44%,50%)] focus:border-purple-500 focus:outline-0 group-[.error]:border-red-400">
    <span class="italic text-red-400 font-light text-xs md:text-sm">Must be a valid day</span></div>
    `;

	return calculatorHead;
};

const giveElementClass = (element: Element, classes: string[]) => {
	classes.forEach((cls) => {
		element.classList.add(cls);
	});
};
