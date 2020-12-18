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

# Les iris

```csv
Id,SepalLengthCm,SepalWidthCm,PetalLengthCm,PetalWidthCm,Species
1, 5.1,3.5,1.4,0.2,Iris-setosa
77,6.8,2.8,4.8,1.4,Iris-versicolor
150,5.9,3.0,5.1,1.8,Iris-virginica
```

```js
{
    SepalLengthCm: 5.1,
    SepalWidthCm: 3.5,
    PetalLengthCm: 1.4,
    PetalWidthCm: 0.2,
    Species: [1, 0, 0]
},
{
    SepalLengthCm: 6.8,
    SepalWidthCm: 2.8,
    PetalLengthCm: 4.8,
    PetalWidthCm: 1.4,
    Species: [0, 1, 0]
},
{
    SepalLengthCm: 5.9,
    SepalWidthCm: 3.0,
    PetalLengthCm: 5.1,
    PetalWidthCm: 1.8,
    Species: [0, 0, 1]
}
```