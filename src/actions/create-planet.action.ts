import { planetsApi } from "../api/planetsApi";
import { Planet } from "../interfaces/planet.interface";
import { logErrorToMyService } from "../shared/logger";

// export const createPlanetAction = async (planet: Partial<Planet>) => {
//   try {
//     const response = await planetsApi.post<Planet>("/", planet);
//     return response.data;
//   } catch (error) {
//     logErrorToMyService(error as Error, null, null);
//     return null;
//   }
// };

export const createPlanetActionForm = async (
  _prevState: unknown,
  queryData: FormData,
) => {
  const formData = Object.fromEntries(queryData.entries());

  try {
    const response = await planetsApi.post<Planet>("/", formData);
    return response.data;
  } catch (error) {
    logErrorToMyService(error as Error, null, null);
    throw new Error("Error al crear el planeta");
    // return null;
  }
};
