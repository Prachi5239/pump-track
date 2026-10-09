import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import MapView from "../components/MapView";
import StationCard from "../components/StationCard";

//import stationsData from "../data/stations";
import { getStations } from "../utils/stationStorage";

function UserDashboard() {

  //const [stations] = useState(stationsData);
const [stations, setStations] = useState(getStations());

useEffect(() => {
  const loadStations = () => {
    setStations(getStations());
  };

  window.addEventListener("storage", loadStations);
  window.addEventListener("fuelStationsUpdated", loadStations);

  return () => {
    window.removeEventListener("storage", loadStations);
    window.removeEventListener("fuelStationsUpdated", loadStations);
  };
}, []);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  const filteredStations = stations.filter(
    (station) => {

      const matchesSearch =
        station.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        station.address
          .toLowerCase()
          .includes(search.toLowerCase());

      let matchesFilter = true;

      if (filter === "open") {
        matchesFilter = station.isOpen;
      }

      if (filter === "closed") {
        matchesFilter = !station.isOpen;
      }

      if (filter === "petrol") {
        matchesFilter = station.petrol;
      }

      if (filter === "diesel") {
        matchesFilter = station.diesel;
      }

      if (filter === "cng") {
        matchesFilter = station.cng;
      }

      return matchesSearch && matchesFilter;
    }
  );

  return (

    <div>

      <Navbar />

      <main className="dashboard">

        <div className="dashboard-header">

          <div>
            <p className="small-title">
              USER DASHBOARD
            </p>

            <h1>
              Find Your Fuel Station
            </h1>

            <p>
              Check nearby stations and fuel
              availability.
            </p>
          </div>

        </div>

        <div className="search-box">

          <input
            type="text"
            placeholder="🔍 Search station or location..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="filters">

          <button
            className={
              filter === "all"
                ? "filter active"
                : "filter"
            }
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={
              filter === "open"
                ? "filter active"
                : "filter"
            }
            onClick={() => setFilter("open")}
          >
            🟢 Open
          </button>

          <button
            className={
              filter === "closed"
                ? "filter active"
                : "filter"
            }
            onClick={() => setFilter("closed")}
          >
            🔴 Closed
          </button>

          <button
            className={
              filter === "petrol"
                ? "filter active"
                : "filter"
            }
            onClick={() => setFilter("petrol")}
          >
            Petrol
          </button>

          <button
            className={
              filter === "diesel"
                ? "filter active"
                : "filter"
            }
            onClick={() => setFilter("diesel")}
          >
            Diesel
          </button>

          <button
            className={
              filter === "cng"
                ? "filter active"
                : "filter"
            }
            onClick={() => setFilter("cng")}
          >
            CNG
          </button>

        </div>

        <MapView stations={filteredStations} />

        <section className="stations-section">

          <div className="section-title">

            <h2>
              Fuel Stations
            </h2>

            <span>
              {filteredStations.length} stations
            </span>

          </div>

          {filteredStations.length === 0 ? (

            <div className="no-results">
              <h3>No stations found</h3>
              <p>
                Try changing your search or filter.
              </p>
            </div>

          ) : (

            <div className="station-grid">

              {filteredStations.map((station) => (

                <StationCard
                  key={station.id}
                  station={station}
                />

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default UserDashboard;