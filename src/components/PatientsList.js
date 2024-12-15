import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removePatient } from "../features/patients/patientsslice";
import { Link } from "react-router";

const PatientsList = () => {
  const patients = useSelector((state) => state.patients.patients || null);
  const dispatch = useDispatch();
  const handleRemove = (id) => {
    dispatch(removePatient(id));
  };

  console.log(patients);
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        <h2>PatientsList</h2>
        <Link to="/addpatients">Add Patient</Link>
      </div>
      <ul>
        {patients &&
          patients.length > 0 &&
          patients.map((patient) => (
            <div
              style={{
                display: "flex",
                gap: "10px",
                listStyle: "none",
                textTransform: "uppercase",
              }}
            >
              <li key={patient.id}>
                {patient?.name} Ailments:{patient?.medicalHistory}
              </li>
              <button type="button" onClick={() => handleRemove(patient.id)}>
                Delete
              </button>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default PatientsList;
