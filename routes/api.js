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
        // Connexion à la base de données MongoDb
        mongoose.connect(mongoUrl, (err, db) =>{

            // Tester la connexion
            if(err){ res.send(err) } 
            else {
    
                // Récupération des documents de la collection 'posts' => find
                db.collection('posts').find().toArray((err, posts) => {
    
                    // Tester la commande MongoDb
                    if(err){ res.send(err) }
    
                    else{ 
                        // Envoyer les données au format json
                        res.json(posts)
                    };
                });
            };
    
            // Fermer la connexion à la base MongoDb
            db.close();
        });
    });
//

/*
Exporter le module de route
*/
    module.exports = router;
//