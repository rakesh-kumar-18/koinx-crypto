import cron from "node-cron";
import { Crypto } from "../models/crypto.model.js";
import { fetchCryptoData } from "../services/crypto.service.js";

const symbols = ["bitcoin", "matic-network", "ethereum"];

export const fetchAndStoreCryptoData = async () => {
    try {
        const cryptoData = await fetchCryptoData(symbols);

        for (const data of cryptoData) {
            await Crypto.create(data);
        }
    } catch (error) {
        console.error("Error in background job:", error.message);
    }
};

cron.schedule("0 */2 * * *", fetchAndStoreCryptoData);

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
            price: latestData.price.toFixed(2),
            marketCap: latestData.marketCap.toFixed(2),
            "24hChange": latestData.change24h.toFixed(2),
        });
    } catch (error) {
        console.error("Error fetching cryptocurrency stats:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getCryptoPriceDeviation = async (req, res) => {
    const { coin } = req.query;

    try {
        if (!coin || coin.trim() === "") {
            return res.status(400).json({ error: "Coin query parameter is required" });
        }

        const records = await Crypto.find({ name: coin })
            .sort({ createdAt: -1 })
            .limit(100)
            .select("price")
            .exec();

        if (!records || records.length === 0) {
            return res.status(404).json({ error: "No data found for the requested cryptocurrency" });
        }

        const prices = records.map((record) => record.price);

        const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;

        const variance =
            prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) /
            prices.length;

        const standardDeviation = Math.sqrt(variance);

        return res.status(200).json({ deviation: parseFloat(standardDeviation.toFixed(2)) });
    } catch (error) {
        console.error("Error calculating standard deviation:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};
