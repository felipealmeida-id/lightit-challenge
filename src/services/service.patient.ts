import { CreatePatientRequest } from '../api/parsers';
import { BaseRepository, patientRepository, platformFileRepository } from '../db/repositories';
import { CreatePlatformFile } from '../types';

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
    return createdPatient;
  };
}
export const patientService = new PatientService();
