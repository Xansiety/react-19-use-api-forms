import { Suspense } from "react";
import { getPlanets } from "./actions/get-planet.action";
import Planets from "./pages/Planets";

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Planetas del Sistema Solar</h1>

      <Suspense
        fallback={
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        }
      >
        <Planets getPlanets={getPlanets()} />
      </Suspense>
    </div>
  );
}

export default App;
