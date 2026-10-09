import { Link } from "react-router-dom";

function Home() {

  return (
    <div className="home">

      <section className="hero">

        <div className="hero-content">

          <p className="small-title">
            SMART FUEL FINDER
          </p>

          <h1>
            Find Fuel.
            <br />
            Find Stations.
            <br />
            Drive Without Worry.
          </h1>

          <p>
            Pump Track helps you find nearby fuel
            stations and check real-time fuel
            availability.
          </p>

          <div className="hero-buttons">

            <Link
              to="/login"
              className="primary-btn"
            >
              Get Started
            </Link>

            <Link
              to="/signup"
              className="secondary-btn"
            >
              Create Account
            </Link>

          </div>

        </div>

        <div className="hero-icon">
          ⛽
        </div>

      </section>

      <section className="features">

        <h2>Why Use Pump Track?</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <span>📍</span>
            <h3>Find Nearby Stations</h3>
            <p>
              Locate fuel stations around you
              using an interactive map.
            </p>
          </div>

          <div className="feature-card">
            <span>⛽</span>
            <h3>Check Fuel Availability</h3>
            <p>
              Check Petrol, Diesel and CNG
              availability before visiting.
            </p>
          </div>

          <div className="feature-card">
            <span>⚡</span>
            <h3>Updated Information</h3>
            <p>
              Get station status and availability
              information from administrators.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;