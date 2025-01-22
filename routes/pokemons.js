import express from 'express';
import { Pool } from 'pg'; // Importation de PostgreSQL

// Configurer la connexion PostgreSQL
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DBPORT                    
});

// Création du routeur Express
const router = express.Router();

// GET /pokemons - Liste de tous les pokémons
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pokemons');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /pokemons/:id - Détails d'un pokémon par ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM pokemons WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pokémon not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
}); 

// POST /pokemons - Créer un nouveau pokémon
router.post('/', async (req, res) => {
  const { name, type } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO pokemons (name, type) VALUES ($1, $2) RETURNING *',
      [name, type]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// PUT /pokemons/:id - Modifier un pokémon par ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;
  try {
    const result = await pool.query(
      'UPDATE pokemons SET name = $1, type = $2 WHERE id = $3 RETURNING *',
      [name, type, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pokémon not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE /pokemons/:id - Supprimer un pokémon par ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM pokemons WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pokémon not found' });
    }
    res.json({ message: 'Pokémon deleted', pokemon: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Exporter les routes
export default router;
