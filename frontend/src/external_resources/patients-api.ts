import axios, { AxiosRequestConfig } from 'axios'
import { CreatePatient, HttpMethod, JSONValue, MULTIPART_HEADERS, PATIENTS_API_CREATE_PATIENT_EP, PATIENTS_API_HOST, PatientApiError, PatientApiResponse } from "../types";
import { getLogger } from '../utils';

class PatientApi {
    private logger = getLogger('PatientApi')

    private sendRequest = async <T>(method: HttpMethod, endpoint: string, data: JSONValue | FormData, config: AxiosRequestConfig): Promise<PatientApiResponse<T>> => {
        try {
            const url = `${PATIENTS_API_HOST}/${endpoint}`
            const response = await axios.request<T>({ url, method, data, headers: config.headers })
            return { success: true, data: response.data }
        } catch (err) {
            this.logger.error(`Error calling ${endpoint}:`, err)
            return { success: false, error: err as PatientApiError }
        }
    }

    createPatient = async (patient: CreatePatient) => {
        const data = new FormData();
        data.append('name', patient.name);
        data.append('email', patient.email);
        data.append('phoneNumber', patient.phoneNumber);
        if (patient.documentPhoto) {
            data.append('documentPhoto', patient.documentPhoto);
        }
        return this.sendRequest('post', PATIENTS_API_CREATE_PATIENT_EP, data, MULTIPART_HEADERS)
    }
}

export const patientApi = new PatientApi()