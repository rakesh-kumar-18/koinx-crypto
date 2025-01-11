import express from "express";
import fetchAndStoreCryptoData from "./controllers/crypto.controller.js";

const app = express();

fetchAndStoreCryptoData();

export default app;
