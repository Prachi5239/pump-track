import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapView({ stations }) {

  return (
    <div className="map-container">

      <MapContainer
        center={[19.076, 72.8777]}
        zoom={11}
        scrollWheelZoom={true}
        className="map"
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {stations.map((station) => (

          <Marker
            key={station.id}
            position={[
              station.latitude,
              station.longitude
            ]}
          >

            <Popup>

              <div className="map-popup">

                <h3>{station.name}</h3>

                <p>{station.address}</p>

                <strong
                  className={
                    station.isOpen
                      ? "available"
                      : "not-available"
                  }
                >
                  {station.isOpen
                    ? "OPEN"
                    : "CLOSED"}
                </strong>

                <hr />

                <p>
                  Petrol:{" "}
                  {station.petrol
                    ? "Available"
                    : "Not Available"}
                </p>

                <p>
                  Diesel:{" "}
                  {station.diesel
                    ? "Available"
                    : "Not Available"}
                </p>

                <p>
                  CNG:{" "}
                  {station.cng
                    ? "Available"
                    : "Not Available"}
                </p>

              </div>

            </Popup>

          </Marker>

        ))}

      </MapContainer>

    </div>
  );
}

export default MapView;