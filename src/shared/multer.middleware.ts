import { extname } from 'path';
import { diskStorage } from 'multer';

export const multerOptions = {
  storage: diskStorage({
    destination: './assets/images/products',
    filename: (req, file, cb) => {
      cb(
        null,
        `${new Date().toISOString()}_${file.originalname}`.replace(/ /g, '_'),
      );
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const maxSize = 1024 * 1024 * 2; // 2 MB

    const extension = extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      return cb(new Error(`File type ${extension} is not allowed`), false);
    }

    if (file.size > maxSize) {
      return cb(
        new Error(`File size exceeds limit of ${maxSize / (1024 * 1024)} MB`),
        false,
      );
    }
    cb(null, true);
  },
};
