import { useState, ChangeEvent, FormEvent, FunctionComponent } from 'react';
import { patientApi } from '../../external_resources';

interface PatientFormData {
    name: string;
    email: string;
    phoneNumber: string;
    documentPhoto: File | null;
}

const PatientForm: FunctionComponent = () => {
    const [formData, setFormData] = useState<PatientFormData>({
        name: '',
        email: '',
        phoneNumber: '',
        documentPhoto: null,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await patientApi.createPatient(formData);
    };

    return (
        <div>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
                <label>Phone Number:</label>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            </div>
            <div>
                <label>Document Photo:</label>
                <input type="file" name="documentPhoto" onChange={handleChange} accept="image/*" required />
            </div>
            <button type="submit" onClick={handleSubmit}>Create User</button>
        </div>
    );
};

export default PatientForm;