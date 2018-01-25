/*
Configurer le module de route
*/
    // Class
    const express = require('express');
    const router = express.Router();

    // MongoDB
    const mongoose = require('mongoose');
    const mongoUrl = 'mongodb://localhost:27020/blog';
//

/*
Définition des routes
*/
    // Accueil
    router.get( '/', (req, res) => {
        // Renvoyer un flux JSON dans la réponse
        res.json( { content: 'Hello API' } );
    });

    // Récupérer la liste de post
    router.get('/posts/', (req, res)=> {
        // TODO
    });
//

/*
Exporter le module de route
*/
    module.exports = router;
//