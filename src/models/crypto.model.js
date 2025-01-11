import { model, Schema } from "mongoose";

const cryptoSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        marketCap: {
            type: Number,
            required: true,
        },
        change24h: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export const Crypto = model("Crypto", cryptoSchema);
