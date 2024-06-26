/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";

interface PatientFormProps {
  addpatient: (patient: any) => Promise<void>;
}

const patientForm: React.FC<PatientFormProps> = ({ addpatient }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
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
      phone: Yup.string()
        .matches(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/, 'Invalid phone number')
        .required("Required"),
      photo: Yup.mixed().required("Required"),
    }),
    onSubmit: async (values) => {
      await addpatient(values);
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
        name="phone"
        onChange={formik.handleChange}
        value={formik.values.phone}
        placeholder="Phone Number"
      />
      {formik.errors.phone && formik.touched.phone && (
        <div>{formik.errors.phone}</div>
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
