import multer from "multer";

// Menyimpan gambar di folder public/images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // Folder tempat menyimpan gambar
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().getTime();
    const extension = file.originalname;
    const filename = `${timestamp}-${extension}`;
    cb(null, filename);
  }
})

// Upload gambar
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1000 * 1000 //5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
})

export default upload;