/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";

interface PatientFormProps {
  addpatient: (patient: any) => void;
}

const patientForm: React.FC<PatientFormProps> = ({ addpatient }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      photo: null,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
        .required("Required"),
      email: Yup.string()
        .email()
        .matches(/@gmail\.com$/, "Email must be a @gmail.com")
        .required("Required"),
      phoneNumber: Yup.string().required("Required"),
      photo: Yup.mixed().required("Required"),
    }),
    onSubmit: (values) => {
      addpatient(values);
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="text"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
        placeholder="Name"
      />
      {formik.errors.name && formik.touched.name && (
        <div>{formik.errors.name}</div>
      )}

      <input
        type="email"
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        placeholder="Email"
      />
      {formik.errors.email && formik.touched.email && (
        <div>{formik.errors.email}</div>
      )}
      <input
        type="text"
        name="phoneNumber"
        onChange={formik.handleChange}
        value={formik.values.phoneNumber}
        placeholder="Phone Number"
      />
      {formik.errors.phoneNumber && formik.touched.phoneNumber && (
        <div>{formik.errors.phoneNumber}</div>
      )}

      <Dropzone
        onDrop={(acceptedFiles) =>
          formik.setFieldValue("photo", acceptedFiles[0])
        }
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            {formik.values.photo ? (
              <p>{(formik.values.photo as File).name}</p>
            ) : (
              <p>Drag 'n' drop a .jpg file here, or click to select one</p>
            )}
          </div>
        )}
      </Dropzone>
      {formik.errors.photo && formik.touched.photo && (
        <div>{formik.errors.photo}</div>
      )}

      <button type="submit">Add patient</button>
    </form>
  );
};

export default patientForm;
