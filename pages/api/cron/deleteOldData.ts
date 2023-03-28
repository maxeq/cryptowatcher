import mongoose, { Schema } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';


interface CoinType {
    id: string;
    dbDateAdded: Date;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation?: number | null;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply?: number | null;
    max_supply?: number | null;
    ath: number;
    ath_change_percentage: number;
    ath_date: Date;
    atl: number;
    atl_change_percentage: number;
    atl_date: Date;
    roi?: object | null;
    last_updated: Date;
    price_change_percentage_1h_in_currency?: number | null;
    price_change_percentage_30d_in_currency?: number | null;
    price_change_percentage_7d_in_currency?: number | null;
}

// Define the schema for a coin
const coinSchema: Schema = new Schema({
    id: { type: String, required: true },
    dbDateAdded: { type: Date, required: true },
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    current_price: { type: Number, required: true },
    market_cap: { type: Number, required: true },
    market_cap_rank: { type: Number, required: true },
    fully_diluted_valuation: { type: Number, default: null },
    total_volume: { type: Number, required: true },
    high_24h: { type: Number, required: true },
    low_24h: { type: Number, required: true },
    price_change_24h: { type: Number, required: true },
    price_change_percentage_24h: { type: Number, required: true },
    market_cap_change_24h: { type: Number, required: true },
    market_cap_change_percentage_24h: { type: Number, required: true },
    circulating_supply: { type: Number, required: true },
    total_supply: { type: Number, default: null },
    max_supply: { type: Number, default: null },
    ath: { type: Number, required: true },
    ath_change_percentage: { type: Number, required: true },
    ath_date: { type: Date, required: true },
    atl: { type: Number, required: true },
    atl_change_percentage: { type: Number, required: true },
    atl_date: { type: Date, required: true },
    roi: { type: Object, default: null },
    last_updated: { type: Date, required: true },
    price_change_percentage_1h_in_currency: { type: Number, default: null },
    price_change_percentage_30d_in_currency: { type: Number, default: null },
    price_change_percentage_7d_in_currency: { type: Number, default: null },
});

const Coin =
    mongoose.models.Coin || mongoose.model<CoinType>('Coin', coinSchema);

const deleteOldCoins = async (): Promise<number> => {
    const twentyDaysAgo = new Date(Date.now() - 20 * 24 * 60 * 60 * 1000);

    twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 1);

    console.log('Deleting coins older than:', twentyDaysAgo);

    const result = await Coin.deleteMany({ dbDateAdded: { $lt: twentyDaysAgo } });

    console.log('Delete operation result:', result);

    return result.deletedCount || 0;
};

const deleteOldCoinsHandler = async (
    _req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        // Connect to MongoDB using the connect() method
        if (process.env.MONGODB_URI) {
            await mongoose.connect(process.env.MONGODB_URI);
        } else {
            console.error('MONGODB_URI environment variable is not defined');
        }

        // Delete coins older than 30 days from the database
        const deletedCount = await deleteOldCoins();

        // Disconnect from MongoDB
        await mongoose.disconnect();

        if (deletedCount > 0) {
            res.status(200).json({
                message: `Successfully deleted ${deletedCount} coins older than 20 days from the database`,
            });
        } else {
            res.status(200).json({
                message: 'No coins older than 20 days were found in the database',
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'An error occurred while deleting coins from the database',
        });
    }
};

export default deleteOldCoinsHandler;