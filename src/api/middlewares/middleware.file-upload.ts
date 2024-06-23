import multer from 'multer';
import { INVERSE_MIME_TYPES, MimeTypes } from '../../types';
import { BadRequestError } from '../../error';

type FileMime = Record<string, MimeTypes[]>;
export const fileUpload = (mimes: FileMime) =>
  multer({
    fileFilter: (_, file, cb) => {
      if (!mimes[file.fieldname]) {
        return cb(null, false);
      }
      if (!mimes[file.fieldname].some((m) => m === file.mimetype)) {
        return cb(
          new BadRequestError(
            `File of extension ${INVERSE_MIME_TYPES[file.mimetype]} not allowed`,
            'Middleware File-Upload',
          ),
        );
      }
      return cb(null, true);
    },
  }).fields(Object.keys(mimes).map((k) => ({ name: k, maxCount: 1 })));
