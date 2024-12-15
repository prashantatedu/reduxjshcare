import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "../features/patients/patientsslice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: { patients: patientReducer, auth: authReducer },
});

export default store;
