import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const multerOptions: MulterOptions = {
  limits: {
    fileSize: 25 * 1024 * 1024, // max 25mb files
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/^image\/(jpeg|png|jpg|webp)$/)) {
      return cb(
        new Error('Only image files (jpeg, png, webp) are allowed!'),
        false,
      );
    }
    cb(null, true);
  },
};
