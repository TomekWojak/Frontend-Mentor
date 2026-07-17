import fs, { existsSync } from "fs";
import readline from "readline/promises";
import { chdir, stdin as input, stdout as output } from "process";
import { execSync } from "child_process";
import { select } from "@inquirer/prompts";

const rl = readline.createInterface({ input, output });

const appContent = `function App() {
  return ('')
}

export default App
`;

const projectName = await rl.question("Podaj nazwę projektu: ");

const framework = await select({
	message: "Wybierz framework:",
	choices: [
		{
			name: "React",
			value: "react",
		},
		{
			name: "Vanilla",
			value: "vanilla",
		},
		{
			name: "Vue",
			value: "vue",
		},
	],
});
const programmingLanguage = await select({
	message: "TS/JS",
	choices: [
		{
			name: "TypeScript",
			value: "typescript",
		},
		{ name: "JavaScript", value: "javascript" },
	],
});

const setUpProject = () => {
	const template =
		programmingLanguage === "typescript" ? `${framework}-ts` : framework;
	execSync(`npm create vite@latest ${projectName} -- --template ${template}`);

	process.chdir(projectName);
	let cssCode = '@import "tailwindcss";';
	let viteConfiguration = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
})
`;
	if (existsSync("vite.config.js") || existsSync("vite.config.ts")) {
		fs.writeFileSync(
			programmingLanguage === "typescript"
				? "vite.config.ts"
				: "vite.config.js",
			viteConfiguration,
		);
	}

	execSync("npm install tailwindcss @tailwindcss/vite", {
		stdio: "inherit",
	});

	process.chdir("src");
	fs.writeFileSync("index.css", cssCode);
	fs.writeFileSync("App.tsx", appContent);
};
const removeUnnesesaryFiles = () => {
	process.chdir("..");
	console.log(process.cwd());
	if (fs.existsSync(".oxlintrc.json")) {
		fs.unlinkSync(".oxlintrc.json");
	}
	process.chdir("src");
	if (fs.existsSync("App.css")) {
		fs.unlinkSync("App.css");
	}
};

setUpProject();
removeUnnesesaryFiles();

process.chdir("..");
execSync("npm run dev", { stdio: "inherit" });
