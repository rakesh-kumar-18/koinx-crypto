import express from "express";
import fetchAndStoreCryptoData from "./controllers/crypto.controller.js";
import cryptoRoutes from "./routes/cryptoStats.route.js";

const app = express();

app.use(express.json());

app.use("/api", cryptoRoutes);

fetchAndStoreCryptoData();

export default app;
