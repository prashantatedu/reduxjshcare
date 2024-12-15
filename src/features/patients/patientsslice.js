import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patients: [],
};

const patientsSlice = createSlice({
  name: "patients",
  initialState: initialState,
  reducers: {
    addPatient: (state, action) => {
      state.patients.push(action.payload);
    },
    removePatient: (state, action) => {
      state.patients = state.patients.filter(
        (patient) => patient.id !== action.payload
      );
    },
  },
});

export const { addPatient, removePatient } = patientsSlice.actions;

export default patientsSlice.reducer;
