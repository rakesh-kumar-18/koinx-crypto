import dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.COINGECKO_API_URL;

export const fetchCryptoData = async (symbols) => {
    try {
        const ids = symbols.join(",");
        const response = await fetch(
            `${API_URL}?ids=${ids}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();

        return Object.entries(data).map(([id, values]) => ({
            name: id,
            price: values.usd,
            marketCap: values.usd_market_cap,
            change24h: values.usd_24h_change,
        }));
    } catch (error) {
        console.error("Error fetching data from CoinGecko:", error.message);
        throw new Error("Failed to fetch cryptocurrency data.");
    }
};
