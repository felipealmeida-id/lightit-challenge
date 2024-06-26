import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  message: string;
  onClose: () => void;
}

const PatientModal: React.FC<ModalProps> = ({ message, onClose }) => {
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default PatientModal;
