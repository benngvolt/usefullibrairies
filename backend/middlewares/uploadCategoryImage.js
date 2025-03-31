const multer = require("multer");
const path = require("path");
const { bucket } = require("../config/firebase-admin");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../tmp"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage }).single("image");

const uploadCategoryImage = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err || !req.file) {
      return res.status(400).json({ error: "Fichier image requis" });
    }

    try {
      const filename = `categories/${uuidv4()}-${req.file.originalname}`;
      await bucket.upload(req.file.path, {
        destination: filename,
        public: true,
        metadata: {
          contentType: req.file.mimetype,
        },
      });

      req.imageUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
      fs.unlinkSync(req.file.path); // Nettoyage
      next();
    } catch (uploadErr) {
      console.error(uploadErr);
      res.status(500).json({ error: "Erreur upload Firebase" });
    }
  });
};

module.exports = uploadCategoryImage;
