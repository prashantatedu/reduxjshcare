import "./App.css";
import PatientsList from "./components/PatientsList";
import AddPatientForm from "./components/AddPatientForm";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { logout } from "./features/auth/authSlice";
import Home from "./components/Home";

function App() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log("Logout");
    dispatch(logout());
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <div>
            <h1>APP with Redux</h1>
          </div>
          <div>
            <nav>
              <ul style={{ listStyle: "none" }}>
                {token ? (
                  <li>
                    <button type="button" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                ) : (
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/patients"
            element={
              <ProtectedRoutes allowedRoles={["Admin", "Doctor"]}>
                <PatientsList />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/addpatients"
            element={
              <ProtectedRoutes allowedRoles={["Receiptionist", "Admin"]}>
                <AddPatientForm />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/unauthorized"
            element={<p>Unauthorised Entry. Contact Admin</p>}
          />
        </Routes>
        {/* <main>
          <PatientsList />
          <AddPatientForm />
          <Login />
        </main> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
