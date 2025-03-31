const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const { v4: uuidv4 } = require("uuid");
const { bucket } = require("../config/firebase-admin");

ffmpeg.setFfmpegPath(ffmpegPath);

const uploadPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

const tmpPath = path.join(__dirname, "../tmp");
if (!fs.existsSync(tmpPath)) fs.mkdirSync(tmpPath);

const storage = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single("audio");

const generatePreview = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("❌ Erreur Multer :", err);
      return res.status(500).json({ error: "Erreur d'upload", details: err.message });
    }

    const file = req.file;
    if (!file) {
      console.error("❌ Aucun fichier reçu");
      return res.status(400).json({ error: "Aucun fichier audio fourni" });
    }

    const previewFileName = `preview_${uuidv4()}.mp3`;
    const originalFileName = `original_${uuidv4()}_${file.originalname}`;
    const outputPreviewPath = path.join(tmpPath, previewFileName);

    console.log("🎧 Audio reçu :", file.originalname);

    ffmpeg(file.path)
      .setStartTime(0)
      .duration(15)
      .audioBitrate("64k")
      .audioChannels(1)
      .output(outputPreviewPath)
      .on("end", async () => {
        try {
          // Upload du preview
          const [previewFile] = await bucket.upload(outputPreviewPath, {
            destination: `previews/${previewFileName}`,
            public: true,
            metadata: { contentType: "audio/mp3" },
          });

          const previewUrl = `https://storage.googleapis.com/${bucket.name}/previews/${previewFileName}`;

          // Upload du fichier original
          const [originalFile] = await bucket.upload(file.path, {
            destination: `sounds/${originalFileName}`,
            public: true,
            metadata: { contentType: file.mimetype },
          });

          const originalUrl = `https://storage.googleapis.com/${bucket.name}/sounds/${originalFileName}`;

          // Nettoyage fichiers temporaires
          fs.unlinkSync(file.path);
          fs.unlinkSync(outputPreviewPath);

          // Passage au controller
          req.previewUrl = previewUrl;
          req.url = originalUrl;

          console.log("✅ Preview :", previewUrl);
          console.log("✅ Original :", originalUrl);

          next();
        } catch (err) {
          console.error("❌ Erreur upload :", err.message);
          return res.status(500).json({ error: "Erreur upload Firebase", details: err.message });
        }
      })
      .on("error", (err) => {
        console.error("❌ Erreur FFmpeg :", err.message);
        return res.status(500).json({ error: "Erreur FFmpeg", details: err.message });
      })
      .run();
  });
};

module.exports = generatePreview;

// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const ffmpeg = require("fluent-ffmpeg");
// const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
// const { v4: uuidv4 } = require("uuid");
// const { bucket } = require("../config/firebase-admin");

// ffmpeg.setFfmpegPath(ffmpegPath);

// // 📁 Chemins absolus pour éviter les bugs
// const uploadPath = path.join(__dirname, "../uploads");
// if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

// const tmpPath = path.join(__dirname, "../tmp");
// if (!fs.existsSync(tmpPath)) fs.mkdirSync(tmpPath);

// // 📦 Multer : stockage temporaire
// const storage = multer.diskStorage({
//   destination: uploadPath,
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage }).single("audio");

// // 🔁 Middleware principal
// const generatePreview = (req, res, next) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       console.error("❌ Erreur d'upload Multer :", err);
//       return res.status(500).json({ error: "Erreur d'upload", details: err.message });
//     }

//     const file = req.file;
//     if (!file) {
//       console.error("❌ Aucun fichier audio reçu.");
//       return res.status(400).json({ error: "Aucun fichier audio fourni" });
//     }

//     const previewFileName = `preview_${uuidv4()}.mp3`;
//     const outputPath = path.join(tmpPath, previewFileName);

//     console.log("🎧 Fichier original reçu :", file.originalname);
//     console.log("⚙️ Génération preview vers :", outputPath);

//     // 🛠 Génération du preview
//     ffmpeg(file.path)
//       .setStartTime(0)
//       .duration(15)
//       .audioBitrate("64k")
//       .audioChannels(1)
//       .output(outputPath)
//       .on("end", async () => {
//         try {
//           // 🔼 Upload du preview sur Firebase Storage
//           const [uploadedFile] = await bucket.upload(outputPath, {
//             destination: `previews/${previewFileName}`,
//             public: true,
//             metadata: { contentType: "audio/mp3" },
//           });

//           const previewUrl = `https://storage.googleapis.com/${bucket.name}/previews/${previewFileName}`;
//           console.log("✅ Preview uploadé :", previewUrl);

//           // 🧹 Nettoyage
//           fs.unlinkSync(file.path);
//           fs.unlinkSync(outputPath);

//           // ➕ On passe l'URL au controller
//           req.previewUrl = previewUrl;
//           next();
//         } catch (err) {
//           console.error("❌ Erreur pendant l'upload du preview :", err.message);
//           return res.status(500).json({ error: "Erreur upload preview", details: err.message });
//         }
//       })
//       .on("error", (err) => {
//         console.error("❌ Erreur FFmpeg :", err.message);
//         return res.status(500).json({ error: "Erreur FFmpeg", details: err.message });
//       })
//       .run();
//   });
// };

// module.exports = generatePreview;
