import { Router } from "express";
import { getCryptoStats, getCryptoPriceDeviation } from "../controllers/crypto.controller.js";

const router = Router();

router.route("/stats").get(getCryptoStats);
router.route("/deviation").get(getCryptoPriceDeviation);

export default router;
