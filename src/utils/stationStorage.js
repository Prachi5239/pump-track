import defaultStations from "../data/stations";

export const getStations = () => {
  const saved = localStorage.getItem("fuelStations");

  if (!saved) {
    localStorage.setItem(
      "fuelStations",
      JSON.stringify(defaultStations)
    );

    return defaultStations;
  }

  try {
    return JSON.parse(saved);
  } catch (error) {
    console.error("Invalid fuelStations data:", error);

    localStorage.setItem(
      "fuelStations",
      JSON.stringify(defaultStations)
    );

    return defaultStations;
  }
};

export const saveStations = (stations) => {
  localStorage.setItem(
    "fuelStations",
    JSON.stringify(stations)
  );
};