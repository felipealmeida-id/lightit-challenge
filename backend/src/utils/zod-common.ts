import { z } from 'zod';

export const zStringBoolean = z
  .string()
  .transform((s) => s.toLowerCase())
  .refine((s) => s === 'true' || s === 'false')
  .transform((s) => s === 'true');

export const zStringNumber = z.coerce.number();

export const zParamUuid = z.object({ id: z.string().uuid() });

export const zBuffer = z.custom<Buffer>((val) => val instanceof Buffer, {
  message: 'Value must be a Buffer',
});
