import axios, { AxiosRequestConfig } from "axios";
import { HttpMetod, JSONValue, MULTIPART_HEADERS, PATIENTS_API_CREATE_PATIENT_EP, PATIENTS_API_HOST, Patient } from "../types";


class PatientApi {

    private sendRequest = async <T>(method: HttpMetod, endpoint: string, data: JSONValue | FormData,config:AxiosRequestConfig) => {
        const url = `${PATIENTS_API_HOST}/${endpoint}`;
        try {
            const response = await axios.request<T>({ url, method, data, headers: config.headers })
            return { success: true, data: response.data }
        } catch (err) {
            console.error(`Error calling ${method}:${url}| ${err}`)
            throw err
        }
    }

    createPatient = (patient: Patient) => {
        const data = new FormData();
        data.append('name', patient.name);
        data.append('email', patient.email);
        data.append('phoneNumber', patient.phone);
        if (patient.photo) {
            data.append('documentPhoto', patient.photo);
        }
        return this.sendRequest('post', PATIENTS_API_CREATE_PATIENT_EP, data, MULTIPART_HEADERS)
    }

}

export const patientApi = new PatientApi();