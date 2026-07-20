import { useState } from "react";
import Controls from "./components/Controls.tsx";
import MainContent from "./components/MainContent/MainContent.tsx";
import type {
	TemperatureUnit,
	WindUnit,
	PrecipitationUnit,
} from "./types/units.ts";

function App() {
	const [temperatureUnit, setTemperatureUnit] =
		useState<TemperatureUnit>("celsius");
	const [windUnit, setWindUnit] = useState<WindUnit>("kmh");
	const [precipitationUnit, setPrecipitationUnit] =
		useState<PrecipitationUnit>("mm");
	return (
		<>
			<Controls
				temperatureUnit={temperatureUnit}
				windUnit={windUnit}
				precipitationUnit={precipitationUnit}
				onTemperatureUnitChange={setTemperatureUnit}
				onWindUnitChange={setWindUnit}
				onPrecipitationUnitChange={setPrecipitationUnit}
			/>
			<MainContent
				temperatureUnit={temperatureUnit}
				windUnit={windUnit}
				precipitationUnit={precipitationUnit}
			/>
		</>
	);
}

export default App;
