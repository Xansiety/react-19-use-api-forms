import { planetsApi } from "../api/planetsApi";
import { Planet } from "../interfaces/planet.interface";

export const getPlanets = async () => {
  console.log("getPlanets");
  const res = await planetsApi.get<Planet[]>("/");
  return res.data;
};
