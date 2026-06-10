import { useState } from "react";
import { updatePlanetAction } from "../../actions/update-planet.action";
import { Planet } from "../../interfaces/planet.interface";

interface Props {
  planets: Planet[];
}

export const PlanetList = ({ planets }: Props) => {
  const [newPlanets, setNewPlanets] = useState<Planet[]>(planets);
  const handleUpdatePlanet = async (planet: Planet) => {
    planet.name = planet.name.toUpperCase();
    const updatePlanet = await updatePlanetAction(planet);
    setNewPlanets((planets) => {
      return planets.map((p) => (p.id === updatePlanet.id ? updatePlanet : p));
    });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fadeIn">
      {newPlanets.map((planet) => (
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
