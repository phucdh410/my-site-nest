import * as multer from 'multer';

export const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    const parts = file.originalname.split('.');

    const fileName = parts[0];
    const extension = parts[1];

    const suffix = Date.now() + Math.round(Math.random() * 1e9);
    callback(null, `${fileName}-${suffix}.${extension}`);
  },
});
