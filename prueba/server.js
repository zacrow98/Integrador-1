require('dotenv').config()

const dotenv = require('dotenv')
const bodyParser =require('body-parser')
const express = require('express')
const app = express()

const {leerFrutas, guardarFrutas} = require("src/frutas.manager.js")

const PORT = process.env.PORT || 3000

let DB = []
dotenv.config()
app.use(bodyParser.json())

app.use((req, res, next) =>{
    DB = leerFrutas()
    next()
})

app.get('/', (req, res) => {
    res.sed(DB)
})

app.post('/', (req, res)=> {
    const nuevaFruta = req.body
    DB.push(nuevaFruta);
    guardarFrutas(DB);
    res.status(201).send ("Fruta agregada!");
})

app.get('*', (req, res)=>{
    res.status(404).send('Lo sentimos la pagina que buscas no existe.')
})

app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})