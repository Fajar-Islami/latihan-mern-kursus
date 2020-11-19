import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router();

// Storage engine
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads'); // folder uploads
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}--${Date.now()}${path.extname(file.originalname)}`,
    );
    // ${path.extname} tipe filenya
  },
});

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/;

  // test menghasil true/false file yang dikirim foto
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  // Kalau benar foto yang dikirim
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, res, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
