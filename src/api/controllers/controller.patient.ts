import { RequestHandler } from 'express';
import { zCreatePatientBody, zCreatePatientFiles } from '../parsers';
import { patientService } from '../../services';

class PatientController {
  createPatient: RequestHandler = async (req, res) => {
    const createPatient = zCreatePatientBody.parse(req.body);
    const documentPhoto = zCreatePatientFiles.parse(req.files);
    const patient = await patientService.createPatient(createPatient, documentPhoto);
    return res.status(201).send(patient);
  };
}

export const patientController = new PatientController();
