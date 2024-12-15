import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPatient } from "../features/patients/patientsslice";

const AddPatientForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [medicalHistory, setMedicalHistory] = useState("");
  const dispatch = useDispatch();

  const handlePatientSubmit = (e) => {
    e.preventDefault();

    if (name && age) {
      const newPatient = {
        id: Date.now(),
        name: name,
        age: age,
        medicalHistory: medicalHistory.split(",").map((item) => item.trim()),
      };
      dispatch(addPatient(newPatient));
      setName("");
      setAge("");
      setMedicalHistory("");
    }
  };

  return (
    <div>
      <h2>AddPatientForm</h2>
      <form onSubmit={handlePatientSubmit}>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
          />
        </div>
        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
};

export default AddPatientForm;
