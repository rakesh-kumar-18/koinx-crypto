import { Router } from "express";
import { getCryptoStats } from "../controllers/cryptoStats.controller.js";

const router = Router();

router.route("/stats").get(getCryptoStats);

export default router;
