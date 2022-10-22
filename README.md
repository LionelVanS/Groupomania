# PROJET 7 - GROUPOMANIA

Bienvenue sur le repository du site du réseau social de l'entreprise Groupomania.

Afin de bien commencer, cloner le repository. 

Pour faire fonctionner le serveur, vous aurez besoin d'installer node.js sur votre machine. Vous le trouverez [sur le site](https://nodejs.org/en/) officiel.

Pour plus de confort, je recommande l'installation de [nodemon](https://www.npmjs.com/package/nodemon) afin de surveiller les modifications.
## 1 - Installation du Back-End
***
Dans un terminal, dans le dépôt tout juste cloné,  tapez la commande suivante:

`cd back`

Cela vous placera dans le dossier Back du projet. Ensuite entrez la commande :

`npm install`

Vous êtes en train  d'installer toutes les dépendances qui seront utiles.
***
## 2 - Installation du Front End
***
Dans un nouveau terminal, toujours dans le dépôt cloné, tapez la commande:

`cd front/groupomania`

Vous arriverez dans le dossier front du projet, entrez ensuite la commande:

`npm install`

Vous lancez l'installations des dépandances côté front-end.
***
## 3 - Lancement de l'application
***
A cette étape, il ne vous restes plus qu'à configurer l'espace de travail. 

- Dans le terminal de l'étape 1 sur l'installation du back-end, créez un dossier images avec la commande: 

    `mkdir images`

- Dans ce même dossier, créez un fichier .env grâce à la commande:

    `touch .env`

    Les variables devant s'y trouver vous ont été transmises par mail.

- Pour terminer, entrez la commande:

    `node server`  

    ou  

    `nodemon server`    

    si vous avez choisi d'utiliser cette option.

    Votre navigateur par défaut va s'ouvrir et l'application tournera en local sur votre machine.

    Le front s'executera sur le port 3000 

    Le serveur tournera sur le port 3001

***
## 4 - Dépendances et technologies
***
### 4.1 - Côté Back-End
***
[![nodeJs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/fr/)
[![MongoDb](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas/database)

[bcrypt](https://www.bcrypt.fr/)  
[cors](https://www.npmjs.com/package/cors)  
[dotenv](https://www.npmjs.com/package/dotenv)  
[email-validator](https://www.npmjs.com/package/email-validator)  
[express-rate-limite](https://www.npmjs.com/package/express-rate-limite)  
[helmet](https://www.npmjs.com/package/helmet)  
[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)  
[mongoose](https://www.npmjs.com/package/mongoose)  
[mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator)  
[multer](https://www.npmjs.com/package/multer)   
[password-validator](https://www.npmjs.com/package/password-validator)  
[validator](https://www.npmjs.com/package/validator)  


***
### 4.2 - Côté Front-End
***
[![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://fr.reactjs.org/) 
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/en/main)
[![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)](https://mui.com/)
[![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)

[axios](https://www.npmjs.com/package/axios)  
[form-data](https://www.npmjs.com/package/form-data)  
[react-burger-menu](https://www.npmjs.com/package/react-burger-menu)  
[json2mq](https://www.npmjs.com/package/json2mq)