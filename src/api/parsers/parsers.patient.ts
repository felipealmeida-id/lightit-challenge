import { z } from 'zod';
import { emailRegex, phoneNumberRegex, zBuffer } from '../../utils';

export const zCreatePatientBody = z.object({
  name: z.string(),
  email: z.string().regex(emailRegex),
  phoneNumber: z.string().regex(phoneNumberRegex),
});

export const zCreatePatientFiles = z
  .object({
    documentPhoto: z
      .object({
        buffer: zBuffer,
        mimetype: z.string(),
        originalname: z.string(),
      })
      .array()
      .length(1),
  })
  .transform((o) => ({
    file: o.documentPhoto[0].buffer,
    fileName: o.documentPhoto[0].originalname,
    mimetype: o.documentPhoto[0].mimetype,
  }));

export type CreatePatientRequest = z.infer<typeof zCreatePatientBody>;
