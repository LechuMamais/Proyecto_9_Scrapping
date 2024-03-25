require("dotenv").config();
const express = require('express');
const cors = require('cors')
const { connectDB } = require("./src/config/db");
const FrasesPrincipalesRoutes = require("./src/api/routes/frasesPrincipales.routes");
const FrasesSecundariosRoutes = require("./src/api/routes/frasesSecundarios.routes");
const FrasesAleatoriasRoutes = require("./src/api/routes/frasesAleatorias.routes");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
connectDB();
app.use(express.json())

app.use("/api/v1/principales", FrasesPrincipalesRoutes);
app.use("/api/v1/secundarios", FrasesSecundariosRoutes);
app.use("/api/v1/game/", FrasesAleatoriasRoutes)

app.use("*", (req,res,next) => {return res.status(404).json("Route Not Found")});
app.listen(PORT, ()=>{console.log("Servidor iniciado en http://localhost:" + PORT)});