import React, { useState } from "react";
import "./login.css";
import authService from "./services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // Login logic
        const loginData = {
          email: formData.email,
          password: formData.password,
        }
        const response = await authService.login(loginData);
        const token = response.data.token.token;
        localStorage.setItem('authToken', token);
        navigate("/");
      } else {
        // Registration logic
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match!");
          return;
        }
        const data = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          mobile: formData.mobile,
        }
        const response = await authService.register(data);
        console.log("Registration successful", response);
        toast.success(`Please check your email`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // navigate("/"); // Adjust this route as needed
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const forgotPage = (e) => {
    e.preventDefault();
    navigate('/forgot-password');
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {isLogin && (
            <p
              style={{ color: "blue", fontSize: "15px", marginTop: "5px", marginLeft: "310px", cursor: "pointer" }}
              onClick={forgotPage}
            >
              <u>Forgot Password?</u>
            </p>
          )}
          {!isLogin && (
            <>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="mobile"
                placeholder="Phone Number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />

            </>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Login;
