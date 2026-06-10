import { Suspense } from "react";
import { getPlanets } from "./actions/get-planet.action";
import Planets from "./pages/Planets";
import { ErrorBoundary } from "./shared/ErrorBoundary";

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Planetas del Sistema Solar</h1>

      <ErrorBoundary
        fallback={
          <div>
            <h2 className="text-red-600">An error occurred</h2>
            <p className="text-gray-600">Please try again later.</p>
            <p className="text-gray-600">Stack trace:</p>
            <pre className="text-gray-600"></pre>
          </div>
        }
      >
        <Suspense
          fallback={
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          }
        >
          <Planets getPlanets={getPlanets()} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
