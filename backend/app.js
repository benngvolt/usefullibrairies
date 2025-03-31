/*-----------------------------------------------------------

CONSTANTES et IMPORTS

-----------------------------------------------------------*/

const express = require('express');
const app = express();
const mongoose = require('mongoose');

// const SECRET_MONGODBKEY = process.env.SECRET_MONGODBKEY;
//Nouvelle instance de l'application Express, pour configurer notre serveur et définir les routes et les middlewares.


/* --------------------------------------------------------

----------- A CONFIGURER ----------------------------------

----------------------------------------------------------*/


// const projectsRoutes = require('./routes/projects');
const categoriesRoutes = require('./routes/categories');
const soundsRoutes = require('./routes/sounds');


/* --------------------------------------------------------

----------- A CONFIGURER ----------------------------------

----------------------------------------------------------*/


const path = require ('path');

// Connexion à mongoose avec l'adresse srv donnée lors de la création du cluster contenant le password
mongoose.connect(process.env.SECRET_MONGODBKEY,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !')) // écrit dans la console du terminal
  .catch((error) => {
    console.error('❌ Connexion à MongoDB échouée !');
    console.error('🔍 Erreur :', error.message);
  });

/*-----------------------------------------------------------

MIDDLEWARES

-----------------------------------------------------------*/

// // MIDDLEWARRE POUR INDIQUER A EXPRESS Où SE TROUVE MON DOSSIER CONTENANT LES IMAGES
// app.use('/images', express.static(path.join(__dirname, 'images')));

// PREMIER MIDDLEWARE POUR GÉRER LES PROBLEMES DE CORS ORIGIN
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
  });

// pour parser les requêtes
app.use(express.json());

/* --------------------------------------------------------

----------- A CONFIGURER ----------------------------------

----------------------------------------------------------*/


// app.use ('/api/projects', projectsRoutes);
app.use ('/api/categories', categoriesRoutes);
app.use ('/api/sounds', soundsRoutes);


/* --------------------------------------------------------

----------- A CONFIGURER ----------------------------------

----------------------------------------------------------*/




// Enfin, cette ligne exporte notre instance d'application Express afin qu'elle puisse être utilisée dans d'autres fichiers du projet. 
// Cela permet d'utiliser cette instance d'application pour créer le serveur et configurer d'autres fonctionnalités.
module.exports = app;



// En résumé, ce code crée une instance d'application Express, définit un middleware qui renvoie une réponse JSON à chaque requête entrante, puis exporte cette instance pour une utilisation ultérieure. 
// C'est une configuration de base pour une application Express simple.
