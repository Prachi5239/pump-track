import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleLogin = (e) => {

    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const user = {
      email,
      fullName: email.split("@")[0],
      role
    };

    localStorage.setItem(
      "pumpTrackUser",
      JSON.stringify(user)
    );

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (

    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          ⛽
        </div>

        <h2>Welcome Back</h2>

        <p>
          Login to continue to Pump Track
        </p>

        <form onSubmit={handleLogin}>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <label>Login As</label>

          <div className="role-options">

            <label>
              <input
                type="radio"
                value="user"
                checked={role === "user"}
                onChange={(e) =>
                  setRole(e.target.value)
                }
              />

              User
            </label>

            <label>
              <input
                type="radio"
                value="admin"
                checked={role === "admin"}
                onChange={(e) =>
                  setRole(e.target.value)
                }
              />

              Admin
            </label>

          </div>

          <button
            type="submit"
            className="auth-btn"
          >
            Login
          </button>

        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup">
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;