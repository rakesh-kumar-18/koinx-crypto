import { Crypto } from "../models/crypto.model.js";

export const getCryptoStats = async (req, res) => {
    const { coin } = req.query;

    try {
        if (!coin || coin.trim() === "") {
            return res.status(400).json({ error: "Coin query parameter is required" });
        }

        const latestData = await Crypto.findOne({ name: coin })
            .sort({ createdAt: -1 })
            .exec();

        if (!latestData) {
            return res.status(404).json({ error: "No data found for the requested cryptocurrency" });
        }

        return res.status(200).json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            "24hChange": latestData.change24h,
        });
    } catch (error) {
        console.error("Error fetching cryptocurrency stats:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};
