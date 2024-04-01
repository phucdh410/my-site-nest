import * as multer from 'multer';
import { destructureFile } from 'src/utils/funcs';

export const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    const { name, extension } = destructureFile(file.originalname);

    const suffix = Date.now() + Math.round(Math.random() * 1e9);
    callback(null, `${name}-${suffix}.${extension}`);
  },
});
