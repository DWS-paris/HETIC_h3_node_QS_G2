# Quickstart Nodejs (ve. HTML)
Mise la place d'un serveur NodeJS avec des vues HTML

<br>

## Mettre en place le serveur
La première chose est d'initier un dossier nodeJS avec la commande :
```
npm init
```
Suivre les indications du terminal.

Créer un fichier pour le serveur, à la base le fichier s'appelle `index.js`mais nous changeons ce ,nom par `server.js`.

<br>

## Installer les dépendances
Pour créer un serveur NodeJS en utilisant le framework ExpressJS, il faut commencer par l'installer sur le serveur avec la commande :
```
npm install --save express
```

Un serveur NodeJS de base à besoin d'un dossier nommé `views`pour héberger les vues client, nous allons modifier le nom de ce dossier par `www` grâce à la dépendance `path` :
```
npm install --save path
```

Un serveur NodeJS doit pouvoir analyser les données d'une requête, par exemple lors de la validation d'un formulaire, les données sont envoyée sur le serveur via une adresse API. Pour ce faire, il faut installer la dépendance `body-parser` :
```
npm install --save body-parser
```

Les vues du clients vont être configurer en HTML pour correspondre à l'affichage d'une application Angular, il faut donc importer le dépendance `ejs` que nous allons utiliser en mode `rendu`:
```
npm install --save ejs
```

<br>

## Monter le serveur NodeJS
Chaque dépendances doit être importer dans le fichier `server.js` dans des constantes, sauf `body-parser` qui sera importer dans les fichiers de route :
```js
/*
Importer les dépendances
*/
    const express = require('express');
    const path = require('path');
    const ejs = require('ejs');
//
```

Une fois les dépendances importer, il faut initier le serveur :
```js
/*
Initialiser le serveur
*/
    const app = express();
    const port = process.env.PORT || 3000;
//
```

Il faut également configurer le dossier pour les vues client :
```js
app.set( 'views', __dirname + '/www' );
app.use( express.static(path.join(__dirname, 'www')) );
```

La dernière étape de configuration permet d'écouter le serveur, CAD de la lancer :
```js
/*
Lancer le serveur
*/
    app.listen( port, () => console.log(`Le serveur est lancé sur le port ${port}`) );
//
```

<br>

## Lancer le serveur
Pour lancer le serveur, il y 3 méthodes possibles :
```
// Méthode 1
node server.js

// Méthode 2
npm start

// Méthode 3 : nécéssite l'installation de nodemon en global
nodemon server.js

```

Pour simplifier le travail, il est conseillé d'installer `nodemon` sur le serveur :
```
npm install --save nodemon
```

Il faut ensuite modifier le script dans le fichier `package.json` de la façon suivante :
```json
...
"scripts": {
    "start": "nodemon server.js"
},
...
```
> Une fois le script modifié, la commande `npm start` lance l'écouteur `nodemon`.

<br>

## Création de la route front
Un serveur NodeJS doit être configurer sur toutes les étapes, comme pour la création des routes. Nous allons préparer le route pour les vues client. Créer un fichier nommé `front.js` dans un dossier nommé `routes` à la racine du serveur.

Ouvri le fichier `front.js` pour configurer le module de route en commencant pour importer les composant :
```js
/*
Importer les composants de la route
*/
    const express = require('express');
    const router = express.Router();
//
```

Dans le même fichier, configurer a route `/` (accueil) de la manière suivante : 
```js
/*
Définition des routes
*/
    router.get( '/', (req, res) => {
        // Renvoyer le fichier index dans la réponse
        res.render('index');
    });
//
```

Pour finir, il faut exporter le module de route :
```js
/*
Exporter le module de route
*/
    module.exports = router;
//
```

Une fois la route front créée, il faut l'importer dans le fichier `server.js` :
```js
const frontRoute = require('./routes/front');
```

Une fois importer il faut configurer le serveur pour lui dire d'utiliser `frontRoute` pour l'adresse `/` :
```js
app.use('/', frontRoute);
```

A cette étape, aucun moteurs de rendu n'est défini, il faut donc utiliser le principe de `ejs` d'une manière qui permet de lier des fichier `.html` aux routes du serveur : 
```js
app.engine( 'html', ejs.renderFile );
app.set( 'view engine', 'html' );
```
> Pour finir, il faut créer une fichier nommé `index.html` dans le dossier `www`.

La page d'accueil du serveur affiche à présent le fichier `index.html`. Bravo - Brava !

<br>

## Ajouter une route API
La route API et construite de la même manière que la route front, il faut donc dupliquer la route front et la mettre à jour pour qu'elle corresponde à une API, la seule différence se tropuve dans la réponse :
```js
router.get( '/', (req, res) => {
    // Renvoyer un flux JSON dans la réponse
    res.json( { content: 'Hello API' } );
});
```
> Il faut ensuite l'importer dans `server.js`et la configurer de la même manière que la route front.



<br>

# Configuration de MongoBD
## Installation sous Mac (Linux)
L'installation de MongoDB se fait grâce à l'invité de commande, vous devez ouvrir une fenêtre d'invité de commande pour installer en global MongoDB sur votre machine :
```
sudo npm install mongodb -g
```
> Vous devez renseigner votre mot de passe administrateur et appuyer sur la touche `enter` pour valider l'installation.

<br>

### Création de la base de données de l'application
Pour stocker les données de la base, vous devez créer un dossier nommé `data` dans le dossier de votre application. Vous devez ensuite ouvrir une fenêtre du terminal pour lancer MongoDB. Vous allez avoir besoin de deux fenêtres : une pour lancer le serveur et une deuxième pour exécuter des commandes sur le serveur. Ouvrez une première fenêtre et placez vous dans le dossier `data` de votre application pour lancer le serveur de BDD :
```
sudo mongod path/to/app/data/ --dbpath
```
> Cette commande lance le serveur de base de données dans le dossier (avantage Linux)

Ouvrez une nouvelle fenêtre de terminal et lancer la commande pour vous interfacer avec la base de données :
```
mongo
```

Après le démarrage de `mongo`, vous pouvez taper le commande suivante pour créer votre collection :
```
use myCollection
```
<br>

## Installation sous Windows
L'installation de MongoDB sous Windows se fait en téléchargeant l'application directement sur votre ordinateur en choisissant la bonne version sur le site de MongoDB à l'adresse suivante
```
https://www.mongodb.com/download-center#community
```
Une fois le fichier téléchargé, vous devez l'exécuter et suivre les étapes qui s'affichent à l'écran.

<br>

### Création de la base de données de l'application
Pour stocker les données de la base, vous devez créer une architecture de dossiers `data\db` dans le dossier de votre disque `C:`. Vous devez ensuite ouvrir une fenêtre `prompt` pour lancer MongoDB. Vous allez avoir besoin de deux fenêtres : une pour lancer le serveur et une deuxième pour exécuter des commandes sur le serveur. Ouvrez une première fenêtre et placez vous dans le dossier de MongoDB dont l'adresse doit resembler à celle ci-dessous :
```
C:\Program Files\MongoDB\Server\3.4\bin
```
> La version, ici `3.4` peut être différente

Dans ce dossier se trouve les exécutables dont vous aurez besoin pour faire tourner MongoDB sur votre machine. Vous devez d'abord lancer le serveur avec mongod :
```
mongod.exe
```

Puis dans une nouvelle fenêtre placée au même endroit, exécuter `mongo` pour vous interfacer avec la BDD :
```
mongo.exe
```

Après le démarrage de `mongo`, vous pouvez taper le commande suivante pour créer votre collection :
```
use myCollection
```

# Configurer MongoDB pour l'application MEAN
Dans un premier temps il faut créer dossier nommé `data` à la racine du serveur pour hébergé la BDD MongoDB.

Ouvrir une fenêtre de terminal pour lancer le serveur de BDD en tapant la commande suivante :
```
sudo mongod --dbpath data
```
> En option il est possible de définir le port en ajoutant à la fin `--port 27018`

Ouvir le shell mongo en tappant dans une nouvelle fenêtre la commande suivante :
```
mongo
```
> Si le port est changé au niveau du serveur, il faut également le préciser, de la même manière.

Créer des un basse de données en tapant la commande suivante :
```
use blog
```

Puis ajouter des données dans cette base avec la commande :
```
db.posts.insert([{ "type" : "IMG", "title" : "Une image de sport", "content" : "http://lorempixel.com/400/200/sports", "tags" : [ "sport", "image" ], "data": { "author": "Julien Noyer", "state": "ONLINE", "likes": 10 } }, { "type" : "QUOTE", "title" : "Lorem ipsum dolor ismet", "content" : "", "tags" : [ "lorem", "image" ], "data": { "author": "John Doe", "state": "DRAFT", "likes": 0 } }, { "type" : "VID", "title" : "The Gladiators", "content" : "P8BKRCpVoug", "tags" : [ "rasta", "video" ], "data": { "author": "Julien Noyer", "state": "DRAFT", "likes": 0 } }, { "type" : "IMG", "title" : "Lorem ipsum dolor ismet", "content" : "http://lorempixel.com/400/200/people", "tags" : [ "lorem", "image" ], "data": { "author": "Carla Santa", "state": "ONLINE", "likes": 30 } }, { "type" : "IMG", "title" : "Une image de chat", "content" : "http://lorempixel.com/400/200/cat", "tags" : [ "chat", "image" ], "data": { "author": "John Doe", "state": "ONLINE", "likes": 20 } }])

```