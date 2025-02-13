import express from "express";
import {
  createPokemon,
  getAllPokemon,
  getPokemonById,
  updatePokemon,
  deletePokemon,
} from "../services/pokemon.js";

// Création du routeur Express
const router = express.Router();

// GET /pokemons - Liste de tous les pokémons
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;

  try {
    res.json(await getAllPokemon(page));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// GET /pokemons/:id - Détails d'un pokémon par ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await getPokemonById(id));
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Pokemon not found" });
    }
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// POST /pokemons - Créer un nouveau pokémon
router.post("/", async (req, res) => {
  try {
    res.status(201).json(await createPokemon(req.body));
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Pokemon not found" });
    }
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// PUT /pokemons/:id - Modifier un pokémon par ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await updatePokemon({ id, ...req.body }));
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Pokemon not found" });
    }
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// DELETE /pokemons/:id - Supprimer un pokémon par ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deletePokemon(parseInt(id));
    res.json({ message: "Pokémon deleted" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Pokemon not found" });
    }
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// Exporter les routes
export default router;
