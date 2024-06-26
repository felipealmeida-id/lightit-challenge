import { invertEnum } from '../utils';
import { MimeTypes } from './enums';

export const INVERSE_MIME_TYPES = invertEnum(MimeTypes) as Record<string, string>;
export const IMAGE_MIME_TYPES = [MimeTypes.jpeg, MimeTypes.jpg, MimeTypes.png];
export const PATIENT_SIGNUP_SUBJECT = 'Welcome!'