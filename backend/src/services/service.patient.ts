import { CreatePatientRequest } from '../api/parsers';
import { BaseRepository, patientRepository, platformFileRepository } from '../db/repositories';
import { mailtrap } from '../external-resources';
import { CreatePlatformFile, PATIENT_SIGNUP_SUBJECT } from '../types';

class PatientService {
  createPatient = async (patient: CreatePatientRequest, documentPicture: CreatePlatformFile) => {
    const createdPatient = await BaseRepository.runInTransaction(async (transaction) => {
      const platformFile = await platformFileRepository.save(
        [{ ...documentPicture, name: `${patient.name}+documentPhoto` }],
        transaction,
      );
      const dbPatient = await patientRepository.save(
        [{ ...patient, documentPhotoId: platformFile[0].id }],
        transaction,
      );
      return dbPatient;
    });
    mailtrap.sendEmail(PATIENT_SIGNUP_SUBJECT, 'Welcome!', createdPatient[0].email).then(() => console.log('Email Sent'))
    return createdPatient[0];
  };
}
export const patientService = new PatientService();
