import express from "express";
import pokemonsRoutes from "./routes/pokemons.js"; // Importation des routes

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/pokemons", pokemonsRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
