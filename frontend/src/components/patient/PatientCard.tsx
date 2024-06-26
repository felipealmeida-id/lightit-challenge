/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";

interface patient {
  name: string;
  email: string;
  phone: string;
  photo: File;
}

interface patientCardProps {
  patient: patient;
}

const PatientCard: React.FC<patientCardProps> = ({ patient }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const photoUrl = URL.createObjectURL(patient.photo);
  return (
    <div className="patient-card">
      <div className="card-header" onClick={() => setIsExpanded(!isExpanded)}>
        <img src={photoUrl} alt={`${patient.name}'s document`} />
        <h2>{patient.name}</h2>
      </div>
      {isExpanded && (
        <div className="card-body">
          <p>Email: {patient.email}</p>
          <p>Phone: {patient.phone}</p>
        </div>
      )}
    </div>
  );
};

export default PatientCard;
