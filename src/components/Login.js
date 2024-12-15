import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, role, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    console.log("handlelogin");
    e.preventDefault();
    const credentials = {
      username,
      password,
    };
    dispatch(login(credentials));
  };

  useEffect(() => {
    if (user && role) {
      navigate("/patients");
    }
  }, [user, role, navigate]);

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading.." : "Login"}
        </button>
        {error && <p>{error?.message || "Error Logging"}</p>}
      </form>
    </div>
  );
};

export default Login;
