# BRAINnode

Pour utiliser ce repo vous devez : 

```bash
npm i
```

Il faut créer un fichier `.env` basé sur le fichier `.env.dist` :

```bash
cp .env.dist .env
```
> Mettre à jour les variables d'environnement

Connecter votre serveur MongoDB : 

```bash
sudo mongod
```

Lancer le serveur nodejs

```bash
npm start
```

> Tips : installer NodeMon en global sur votre machine