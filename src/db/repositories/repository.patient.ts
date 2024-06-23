import { Patient } from '../models';
import { BaseRepository } from './repository.base';

export const patientRepository = new BaseRepository(Patient);
