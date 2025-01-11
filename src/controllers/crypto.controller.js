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

export default fetchAndStoreCryptoData;
