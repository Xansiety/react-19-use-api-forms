import { planetsApi } from "../api/planetsApi";
import { Planet } from "../interfaces/planet.interface";
import { logErrorToMyService } from "../shared/logger";

const sleep = async () => {
  return new Promise((r) => setTimeout(r, 2000));
};

export const updatePlanetAction = async (planet: Planet) => {
  try {
    await sleep(); // 2 seconds
    throw new Error(
      "Error al actualizar el planeta (PRUEBA handle error in Transition)",
    );
    const response = await planetsApi.patch<Planet>(`/${planet.id}`, planet);
    console.log("Planet updated successfully");
    return response.data;
  } catch (error) {
    logErrorToMyService(error as Error, null, null);
    throw new Error("Error al actualizar el planeta");
  }
};
