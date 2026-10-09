import { useState } from "react";
import { Navigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import StationCard from "../components/StationCard";
import { getStations, saveStations } from "../utils/stationStorage";

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("pumpTrackUser"));

  if (!user || user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  const [stations, setStations] = useState(getStations());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyStation = {
    name: "",
    company: "",
    address: "",
    latitude: "",
    longitude: "",
    isOpen: true,
    petrol: true,
    diesel: true,
    cng: false
  };

  const [form, setForm] = useState(emptyStation);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.company || !form.address) {
      alert("Please fill required fields");
      return;
    }

    const stationData = {
      ...form,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude)
    };

    let updatedStations;

    if (editingId !== null) {
      updatedStations = stations.map((station) =>
        station.id === editingId
          ? { ...stationData, id: editingId }
          : station
      );
      alert("Station updated successfully");
    } else {
      updatedStations = [
        ...stations,
        {
          ...stationData,
          id: Date.now()
        }
      ];
      alert("Station added successfully");
    }

    setStations(updatedStations);
    saveStations(updatedStations);

    // Notify other open dashboard tabs immediately.
    window.dispatchEvent(new Event("fuelStationsUpdated"));

    setForm(emptyStation);
    setEditingId(null);
    setShowForm(false);
  };

  const editStation = (station) => {
    setForm(station);
    setEditingId(station.id);
    setShowForm(true);
  };

  const deleteStation = (id) => {
    if (!window.confirm("Are you sure you want to delete this station?")) {
      return;
    }

    const updatedStations = stations.filter((station) => station.id !== id);

    setStations(updatedStations);
    saveStations(updatedStations);
    window.dispatchEvent(new Event("fuelStationsUpdated"));
  };

  const openStations = stations.filter((station) => station.isOpen).length;
  const closedStations = stations.filter((station) => !station.isOpen).length;

  return (
    <div>
      <Navbar />

      <main className="dashboard">
        <div className="admin-header">
          <div>
            <p className="small-title">ADMIN PANEL</p>
            <h1>Manage Fuel Stations</h1>
            <p>Add, update and manage fuel station availability.</p>
          </div>

          <button
            className="primary-btn"
            onClick={() => {
              setForm(emptyStation);
              setEditingId(null);
              setShowForm(true);
            }}
          >
            + Add Station
          </button>
        </div>

        <div className="stats">
          <div className="stat-card">
            <span>⛽</span>
            <div>
              <p>Total Stations</p>
              <h2>{stations.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>🟢</span>
            <div>
              <p>Open Stations</p>
              <h2>{openStations}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>🔴</span>
            <div>
              <p>Closed Stations</p>
              <h2>{closedStations}</h2>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="admin-form-container">
            <h2>{editingId !== null ? "Edit Fuel Station" : "Add Fuel Station"}</h2>

            <form className="station-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div>
                  <label>Station Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Station name"
                    required
                  />
                </div>

                <div>
                  <label>Company</label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="HP / BPCL / IOCL"
                    required
                  />
                </div>

                <div className="full-width">
                  <label>Address</label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Station address"
                    required
                  />
                </div>

                <div>
                  <label>Latitude</label>
                  <input
                    name="latitude"
                    type="number"
                    step="any"
                    value={form.latitude}
                    onChange={handleChange}
                    placeholder="19.076"
                    required
                  />
                </div>

                <div>
                  <label>Longitude</label>
                  <input
                    name="longitude"
                    type="number"
                    step="any"
                    value={form.longitude}
                    onChange={handleChange}
                    placeholder="72.877"
                    required
                  />
                </div>
              </div>

              <div className="availability-options">
                <label>
                  <input
                    type="checkbox"
                    name="isOpen"
                    checked={form.isOpen}
                    onChange={handleChange}
                  />
                  Station Open
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="petrol"
                    checked={form.petrol}
                    onChange={handleChange}
                  />
                  Petrol Available
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="diesel"
                    checked={form.diesel}
                    onChange={handleChange}
                  />
                  Diesel Available
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="cng"
                    checked={form.cng}
                    onChange={handleChange}
                  />
                  CNG Available
                </label>
              </div>

              <div className="form-actions">
                <button type="submit" className="primary-btn">
                  {editingId !== null ? "Update Station" : "Add Station"}
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setForm(emptyStation);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <section className="stations-section">
          <div className="section-title">
            <h2>All Fuel Stations</h2>
            <span>{stations.length} stations</span>
          </div>

          <div className="station-grid">
            {stations.map((station) => (
              <StationCard
                key={station.id}
                station={station}
                onEdit={editStation}
                onDelete={deleteStation}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
