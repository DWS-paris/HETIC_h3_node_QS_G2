/*
Importer les composants serveur
*/
    // Class
    const express = require('express');
    const ejs = require('ejs');
    const path = require('path');

    // Modules
    const frontRoute = require('./routes/front');
    const apiRoute = require('./routes/api');
//

/*
Configuration du serveur
*/
    // Définition des variables
    const app = express();
    const port = process.env.PORT || 3000;

    // Définition du dossier static du client
    app.set( 'views', __dirname + '/www' );
    app.use( express.static(path.join(__dirname, 'www')) );

    // Configuration du moteur de rendu
    app.engine( 'html', ejs.renderFile );
    app.set( 'view engine', 'html' );

    // Définition des routes
    app.use('/', frontRoute);
    app.use('/api', apiRoute);
//


/*
Lancer le serveur
*/
    app.listen(port, ()=> console.log(`Le serveur est mlancé sur le port ${port}`));
//