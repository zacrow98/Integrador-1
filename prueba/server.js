require('dotenv').config()

const dotenv = require('dotenv')
const express = require('express')
const app = express()

const {leerFrutas, guardarFrutas} = require("./src/frutas.manager")

const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.static('views'))

let DB = []
dotenv.config()
app.use(express.json())

app.use('/', (req, res, next) =>{
    DB = leerFrutas()
    next()
})

app.get('/', (req, res) => {
    res.send(DB)
})

// app.get("/1", (req, res) => {
//     const data = {
//       title: "Frutas",
//       message: "Este es el trabajo practico integrador con motores de plantilla",
//       titleCard1: "Motores de Plantilla",
//       messageCard1:
//         "Los motores de plantilla son herramientas que simplifican el proceso de desarrollo web al permitir la separación de la lógica de presentación del contenido. Facilitan la creación de páginas web dinámicas al combinar plantillas predefinidas con datos variables, lo que resulta en un flujo de trabajo más eficiente y una mayor flexibilidad.",
//       titleCard2: "EJS",
//       messageCard2:
//         "EJS es una herramienta poderosa para generar HTML dinámico en aplicaciones web, permitiendo la integración de JavaScript y la manipulación de datos en las vistas de manera sencilla y eficiente. Con EJS, puedes separar la lógica de presentación de tu aplicación y generar vistas dinámicas basadas en los datos que recibes del servidor.",
//       listaFrutas: DB
//     };
  
//     res.render("index", data);
//   });

app.get('/id/:id', (req, res) =>{
  let iden = parseInt(req.params.id)
  result ? res.json(result) : res.json([{id:'error', descripcion: 'no se encontro el id indicado'}])
})

app.get('/nombres/:nombre', (req, res) =>{
  let search = req.params.nombre.trim();
  const result = BD.filter(producto => producto.nombre.toLowerCase().includes(search.toLowerCase()));
  result.length > 0  ? res.json(result) : res.json([{ id: "Error", descripcion: "No se encontraron coincidencias." }
  ]);
});

app.post('/', (req, res) =>{
  const nuevaFruta = req.body
  BD.push(nuevaFruta)
  guardarFrutas(BD)
  res.status(201).send('Fruta guardada')
})

app.put('/id/:id', (req, res) =>{  
  let iden = parseInt(req.params.id);
  const result = BD.find(i => i.id === iden);
  console.log(result);
  if(result){
    const find = elment => elment === result;
    const otraFruta = req.body;
    BD[BD.findIndex(find)] = otraFruta
    guardarFrutas(BD);
    res.status(200).send("Se cambiaron los valores correctamente")
  } else {
    const nuevaFruta = req.body;
    BD.push(nuevaFruta); 
    guardarFrutas(BD)
    res.status(201).send("Fruta agregada.")
  }
});


app.delete('/',(req,res) => { 
  BD.pop();
  guardarFrutas(BD);
  res.status(200).send('Ultima fruta eliminada.');
});

app.delete('/id:id',(req, res) =>{
  let iden = parseInt(req.params.id)
  const result = BD.find(i => i.id === iden)
  if(result){
    BD = BD.filter(item => item.id !== iden)
    guardarFrutas(BD)
    res.status(200).send('Fruta eliminada.')
  }else {
    res.send('No se encontro la fruta con el id: ${iden}.')
  }
})


// CONTROL DE ERRORES
app.get('*', (req, res)=>{
    res.status(404).send('Lo sentimos la pagina que buscas no existe.')
})

app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})
