import { useOptimistic, useTransition } from "react";
import { updatePlanetAction } from "../../actions/update-planet.action";
import { Planet } from "../../interfaces/planet.interface";

interface Props {
  planets: Planet[];
}

export const PlanetList = ({ planets }: Props) => {
  const [_isPending, startTransition] = useTransition(); // useTransition hook: this allow to keep the UI in sync with the state

  // What is Optimistic Update in React
  // To change the state optimistically, we can use the useOptimistic hook
  const [optimisticPlanets, setOptimisticPlanets] = useOptimistic(
    planets,
    (currentPlanets: Planet[], newPlanet: Planet) => {
      return currentPlanets.map((p) => (p.id === newPlanet.id ? newPlanet : p));
    },
  );
  const handleUpdatePlanet = async (planet: Planet) => {
    const data = {
      ...planet,
      name: planet.name.toUpperCase(),
    };
    startTransition(async () => {
      try {
        setOptimisticPlanets(data); // Optimistic - should be called before the action
        await updatePlanetAction(data);
      } catch (error) {
        setOptimisticPlanets(planet); // If the action fails, reset the optimistic state with the previous value
      }
    });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fadeIn">
      {optimisticPlanets.map((planet) => (
        <div key={planet.id} className="p-4 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-semibold">{planet.name}</h2>
          <p className="text-gray-700">{planet.type}</p>
          <p className="text-gray-700">{planet.distanceFromSun}</p>
          <br />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => handleUpdatePlanet(planet)}
          >
            Actualizar
          </button>
        </div>
      ))}
    </div>
  );
};
