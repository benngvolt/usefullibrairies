const Sound = require('../models/sound')
// const { storage, bucket } = require('../config/storage');

/*------------------------
----- GET ALL PROJECTS ---
-------------------------*/

exports.getAllSounds = (req, res) => {
    Sound.find()
      .then (sounds =>res.status(200).json(sounds))
      .catch (error => res.status (400).json({error}))
  }

/*------------------------
----- GET ONE PROJECT ----
-------------------------*/

exports.getOneSound = (req, res) => {
  Sound.findOne({_id: req.params.id})
    .then (sound =>res.status(200).json(sound))
    .catch (error => res.status (400).json({error}))
}


/*--------------------------
----- DELETE ONE PROJECT -----
--------------------------*/

exports.deleteOneSound = async (req, res, next) => {
  try {
    const deletedSound = await Sound.findOneAndDelete({ _id: req.params.id });
    if (!deletedSound) {
      return res.status(404).json({ message: 'Fichier sonore non trouvé' });
    }
    // const projects = await Project.find();
    // const imageUrls = projects.flatMap((project) => project.images.map((image) => image.imageUrl));
    // Appeler la fonction de suppression d'images après avoir supprimé la série
    res.status(200).json({ message: 'Fichier sonore supprimé !' });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression du fichier sonore' });
  }
};


/*------------------------
----- CREATE PROJECT -----
------------------------*/

// exports.uploadSound = async (req, res) => {
    
//     const soundData = req.body;
//     // const images = req.newImagesObjects;
//     // const sketches = req.newSketchesObjects;
  
//     const descriptionWithBr = req.body.description
//     console.log("📥 Données reçues :", soundData);
//     console.log("🎧 URL preview :", req.previewUrl);
//     if (!soundData.name || !req.previewUrl) {
//       return res.status(400).json({ error: 'Le champ "name" ou "previewUrl" est manquant dans la demande.' });
//     }
  
//     try {
//       // if (serieImages.length === req.newImagesObjects.length) {
//         // Si toutes les images ont été traitées, créez une nouvelle instance du modèle Serie
//         const sound = new Sound({
//           ... soundData,
//           description: descriptionWithBr,
//           previewUrl: req.previewUrl
//           // images: images,
//           // sketches: sketches
//         });
//         await sound.save();
//         res.status(201).json({ message: 'Projet sonore enregistré !' });
//       // }
//     } catch (error) {
//       console.error("❌ Erreur enregistrement sound :", error.message);
//       res.status(500).json({
//         error: "Erreur lors de l'enregistrement du son",
//         details: error.message
//       });
//     }
//   };

exports.uploadSound = async (req, res) => {
  const { name, description, categoryId, price } = req.body;

  if (!name || !req.previewUrl || !req.url) {
    return res.status(400).json({ error: 'Champs requis manquants (name, previewUrl, url).' });
  }

  try {
    const sound = new Sound({
      name,
      description,
      categoryId,
      price: price ? parseFloat(price) : undefined,
      previewUrl: req.previewUrl,
      url: req.url,
    });

    await sound.save();
    res.status(201).json({ message: "Son et preview enregistrés avec succès", sound });
  } catch (error) {
    console.error("❌ Erreur enregistrement :", error.message);
    res.status(500).json({ error: "Erreur MongoDB", details: error.message });
  }
};

/*--------------------------
----- UPDATE ONE PROJECT -----
--------------------------*/

exports.updateOneSound = async (req, res, next) => {

    // MODIFICATION DU PROJET
    try {
      // RÉCUPÉRATION DU PROJET CONCERNÉ VIA SON ID STOCKÉ EN PARAMÈTRES D'URL
      const sound = await Sound.findOne({ _id: req.params.id });

      // SI LE PROJET N'EXISTE PAS, ON RETOURNE UNE ERREUR 404
      if (!sound) {
        return res.status(404).json({ error: 'Projet non trouvé' });
      }

      const soundData = req.body;
      const descriptionWithBr = req.body.description;

      // RÉCUPÉRATION DES IMAGES EXISTANTES DEPUIS LE FRONTEND, PARSE DES DONNÉES
      // const existingImages = req.body.existingImages || [];
      // const existingImagesObjects = existingImages.map((imageStr) => JSON.parse(imageStr));

      //RÉCUPÉRATION DES CROQUIS EXISTANTS DEPUIS LE FRONTEND, PARSE DES DONNÉES
      // const existingSketches = req.body.existingSketches || [];
      // const existingSketchesObjects = existingSketches.map((sketchStr) => JSON.parse(sketchStr));

      // async function processAndSortImages(existingImagesObjects, newImagesObjects) {
      //   const allImages = existingImagesObjects.map((image, index) => ({
      //     imageUrl: image.imageUrl,
      //     index,
      //   })).concat(newImagesObjects);
      //   allImages.sort((a, b) => a.index - b.index);
      //   const updatedImages = allImages.filter((image) => image != null && image !== "empty");
      //   return updatedImages;
      // }

      // async function processAndSortSketches(existingSketchesObjects, newSketchesObjects) {
      //   const allSketches = existingSketchesObjects.map((sketch, index) => ({
      //     imageUrl: sketch.imageUrl,
      //     sketchCaption: sketch.sketchCaption,
      //     index,
      //   })).concat(newSketchesObjects);
      //   allSketches.sort((a, b) => a.index - b.index);
      //   const updatedSketches = allSketches.filter((sketch) => sketch != null && sketch !== "empty");
      //   return updatedSketches;
      // }
  
      // MISE À JOUR DE LA SÉRIE DANS LA BASE DE DONNÉES
      async function updateSound(
        // updatedImages
        ) {
        // const updatedMainImageIndex = req.body.mainImageIndex || 0;
        // const updatedMainSketchIndex = req.body.mainSketchIndex || 0;

        if (!soundData.name || !soundData.url) {
          return res.status(400).json({ error: 'Le champ "nom" ou "url" est manquant dans la demande.' });
        }
        
        const soundObject = {
          ...soundData,
          description: descriptionWithBr,  
          previewUrl: req.previewUrl   
          // mainImageIndex: updatedMainImageIndex,
          // images: updatedImages,
          // sketches: updatedSketches
        };
  
        await Sound.updateOne({ _id: req.params.id }, soundObject);
        console.log('Sound updated successfully');
        res.status(200).json({ message: 'Projet sonore modifiée' });
        next();
        // À ce stade, vous pouvez appeler d'autres fonctions si nécessaire
      }
  
      // const newImagesObjects = req.newImagesObjects || [];
      // const newSketchesObjects = req.newSketchesObjects || [];

      // const updatedImages = await processAndSortImages(existingImagesObjects, newImagesObjects);
      // const updatedSketches = await processAndSortSketches(existingSketchesObjects, newSketchesObjects);

      await updateSound(
        // updatedImages, updatedSketches
        );

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour du son.' });
    }
  };