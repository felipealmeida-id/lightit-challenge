export type HttpMethod = 'post' | 'get' | 'put' | 'patch' | 'delete' | 'options'
export type JSONValue = string | number | boolean | null | { [x: string]: JSONValue } | Array<JSONValue>;

export type PatientApiError = { error: string, path?: string[] }
export type PatientApiResponse<T> = { success: true, data: T } | { success: false, error: PatientApiError }

export type CreatePatient = {
    name: string;
    email: string;
    phoneNumber: string;
    documentPhoto: File | null;
}