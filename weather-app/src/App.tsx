import Controls from "./components/Controls.tsx";
import MainContent from "./components/MainContent/MainContent.tsx";



function App() {
	
	return (
		<>
			<Controls />

			{/* będę wyświetlał warunkowo MainContent */}
			<MainContent />
		</>
	);
}

export default App;
