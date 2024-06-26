/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import PatientCard from "../components/patient/PatientCard";
import PatientForm from "../components/patient/PatientForm";
import Modal from "../components/patient/modal/Modal";

interface Patient {
  name: string;
  email: string;
  phone: string;
  photo: File;
}

const patientList: React.FC = () => {
  const [patients, setpatients] = useState<Patient[]>([]);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const storedpatients = JSON.parse(localStorage.getItem("patients") || "[]");
    setpatients(storedpatients);
  }, []);

  const addpatient = (patient: Patient) => {
    const newpatients = [...patients, patient];
    setpatients(newpatients);
    localStorage.setItem("patients", JSON.stringify(newpatients));
    setModalMessage("Patient added successfully");
  };

  const closeModal = () => {
    setModalMessage("");
  };

  return (
    <div>
      <PatientForm addpatient={addpatient} />
      <div className="patient-list">
        {patients.length > 0 ? (
          patients.map((patient, index) => (
            <PatientCard key={index} patient={patient} />
          ))
        ) : (
          <p>No patients available</p>
        )}
      </div>
      {modalMessage && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default patientList;
