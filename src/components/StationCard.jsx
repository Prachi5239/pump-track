function StationCard({ station, onEdit, onDelete }) {

  return (
    <div className="station-card">

      <div className="station-header">

        <div>
          <h3>{station.name}</h3>
          <p>{station.company}</p>
        </div>

        <span
          className={
            station.isOpen
              ? "status open"
              : "status closed"
          }
        >
          {station.isOpen ? "● OPEN" : "● CLOSED"}
        </span>

      </div>

      <p className="address">
        📍 {station.address}
      </p>

      <div className="fuel-section">

        <div className="fuel-item">
          <span>Petrol</span>

          <strong
            className={
              station.petrol
                ? "available"
                : "not-available"
            }
          >
            {station.petrol
              ? "✓ Available"
              : "✕ Not Available"}
          </strong>
        </div>

        <div className="fuel-item">
          <span>Diesel</span>

          <strong
            className={
              station.diesel
                ? "available"
                : "not-available"
            }
          >
            {station.diesel
              ? "✓ Available"
              : "✕ Not Available"}
          </strong>
        </div>

        <div className="fuel-item">
          <span>CNG</span>

          <strong
            className={
              station.cng
                ? "available"
                : "not-available"
            }
          >
            {station.cng
              ? "✓ Available"
              : "✕ Not Available"}
          </strong>
        </div>

      </div>

      <div className="station-actions">

        {onEdit && (
          <button
            className="edit-btn"
            onClick={() => onEdit(station)}
          >
            Edit
          </button>
        )}

        {onDelete && (
          <button
            className="delete-btn"
            onClick={() => onDelete(station.id)}
          >
            Delete
          </button>
        )}

        <a
          className="direction-btn"
          href={`https://www.google.com/maps/search/?api=1&query=${station.latitude},${station.longitude}`}
          target="_blank"
          rel="noreferrer"
        >
          Directions
        </a>

      </div>

    </div>
  );
}

export default StationCard;