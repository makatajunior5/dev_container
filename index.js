const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// Route de base (racine)
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur Pokémon !');
});

// Route pour récupérer des données Pokémon
app.get('/pokemon/:name', async (req, res) => {
  const pokemonName = req.params.name;
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  console.log(`Récupération de données pour Pokémon: ${pokemonName}`);

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Échec de la récupération des données pour ${pokemonName}: ${response.statusText}`);
      return res.status(500).json({ error: 'Erreur lors de la récupération des données Pokémon' });
    }

    const data = await response.json();
    console.log('Data received:', data);
    res.json(data);
  } catch (error) {
    console.error('erreur produite:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});