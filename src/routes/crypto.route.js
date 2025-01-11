import { Router } from "express";
import { getCryptoStats } from "../controllers/crypto.controller.js";

const router = Router();

router.route("/stats").get(getCryptoStats);

export default router;
