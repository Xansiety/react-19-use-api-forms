import { planetsApi } from "../api/planetsApi";
import { Planet } from "../interfaces/planet.interface";
import { logErrorToMyService } from "../shared/logger";

export const updatePlanetAction = async (planet: Planet) => {
  try {
    const response = await planetsApi.patch<Planet>(`/${planet.id}`, planet);
    console.log("Planet updated successfully");
    return response.data;
  } catch (error) {
    logErrorToMyService(error as Error, null, null);
    throw new Error("Error al actualizar el planeta");
  }
};
