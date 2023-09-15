const express = require('express');
const app = express();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)) // Solucion para importar nodefetch solo con require
const cors = require('cors')


app.use(cors({ origin: true }))// por defecto cualquier origen funciona en nuestra api

const apiKey = '1BJzitRRvqnzYnkIDeWd5EsKfyfixQSm'

// Rutas y middleware de Express se configurarán aquí

/* :id Recibiria la keyword desde la app en react */
app.get('/obtenerDatos/:id', async (req, res) => {
    const id = req.params.id;
    try {
        // URL de la API externa que deseas consultar
        const apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${id}&limit=10&offset=0&rating=g&lang=en`
        // Realiza la solicitud a la API externa usando fetch
        const response = await fetch(apiURL);

        // Verifica si la respuesta es exitosa (código de estado HTTP 200)
        if (response.status === 200) {
            const data = await response.json(); // Parsea la respuesta JSON
            res.json(data); // Envía los datos obtenidos como respuesta a la solicitud HTTP
        } else {
            // Si la respuesta no es exitosa, maneja el error adecuadamente
            res.status(response.status).json({ error: 'Error al obtener los datos de la API' });
        }
    } catch (error) {
        // Maneja los errores de la solicitud
        console.error('Error al realizar la solicitud:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/access', (req, res) => {
    console.log('access')
    res.send('¡Hola, mundo!');
});


// Iniciar el servidor
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server on port ${port}`) // mensaje en consola luego de levantar el servidor
})
