# Cryptocurrency API

This project is a Node.js application that provides APIs to fetch the latest statistics and calculate the standard deviation of cryptocurrency prices. The application uses MongoDB to store cryptocurrency data and implements a background service that fetches cryptocurrency prices every 2 hours.

---

## **Features**

- Background service to fetch cryptocurrency data (price, market cap, and 24h change) every 2 hours from the CoinGecko API.
- `/stats` API to fetch the latest cryptocurrency data.
- `/deviation` API to calculate the standard deviation of cryptocurrency prices for the last 100 records.

---

## **Getting Started**

Follow these steps to run the project locally:

### **1. Clone the Repository**
```bash
git clone https://github.com/rakesh-kumar-18/koinx-crypto.git
cd koinx-crypto
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up Environment Variables**

Create a `.env` file in the root directory and add the following variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/crypto-db
COINGECKO_API_URL=https://api.coingecko.com/api/v3/simple/price
```

- `PORT`: Port number to run the application (default is 3000).
- `MONGO_URI`: MongoDB connection string.
- `COINGECKO_API_URL`: URL to the CoinGecko API.

### **4. Start MongoDB**

Ensure that your MongoDB instance is running locally or remotely.

### **5. Run the Application**
```bash
npm start
```

This will start the application on the configured port.

---

## **Available APIs**

### **1. Fetch Latest Cryptocurrency Data**
- **Endpoint**: `/api/stats`
- **Method**: `GET`
- **Query Params**:
  - `coin`: The name of the cryptocurrency (e.g., `bitcoin`, `ethereum`, `matic-network`).
- **Example**:
  ```bash
  curl "http://localhost:3000/api/stats?coin=bitcoin"
  ```
- **Response**:
  ```json
  {
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
  }
  ```

### **2. Calculate Standard Deviation**
- **Endpoint**: `/api/deviation`
- **Method**: `GET`
- **Query Params**:
  - `coin`: The name of the cryptocurrency (e.g., `bitcoin`, `ethereum`, `matic-network`).
- **Example**:
  ```bash
  curl "http://localhost:3000/api/deviation?coin=bitcoin"
  ```
- **Response**:
  ```json
  {
    "deviation": 4082.48
  }
  ```

---

## **Background Job**

The application uses `node-cron` to fetch cryptocurrency data every 2 hours. This data is stored in the MongoDB database.

To manually test the background job, call the `fetchAndStoreCryptoData` function directly from the console or trigger it on-demand during development.
