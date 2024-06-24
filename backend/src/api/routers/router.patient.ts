import { Router } from 'express';
import { patientController } from '../controllers';
import { asyncError, fileUpload } from '../middlewares';
import { IMAGE_MIME_TYPES } from '../../types';

const router = Router();

router.post('/', fileUpload({ documentPhoto: IMAGE_MIME_TYPES }), asyncError(patientController.createPatient));

export const patientRouter = router;
