import axios from 'axios';
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

// Define the model for a coin
const Coin = mongoose.models.Coin || mongoose.model<CoinType>('Coin', coinSchema);

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Make an HTTP GET request to the API
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=1h,7d,30d');
    const coins: CoinType[] = response.data.map((c: any) => ({
      id: c.id,
      dbDateAdded: new Date(),
      symbol: c.symbol,
      name: c.name,
      image: c.image,
      current_price: c.current_price,
      market_cap: c.market_cap,
      market_cap_rank: c.market_cap_rank,
      fully_diluted_valuation: c.fully_diluted_valuation,
      total_volume: c.total_volume,
      high_24h: c.high_24h,
      low_24h: c.low_24h,
      price_change_24h: c.price_change_24h,
      price_change_percentage_24h: c.price_change_percentage_24h,
      market_cap_change_24h: c.market_cap_change_24h,
      market_cap_change_percentage_24h: c.market_cap_change_percentage_24h,
      circulating_supply: c.circulating_supply,
      total_supply: c.total_supply,
      max_supply: c.max_supply,
      ath: c.ath,
      ath_change_percentage: c.ath_change_percentage,
      ath_date: new Date(c.ath_date),
      atl: c.atl,
      atl_change_percentage: c.atl_change_percentage,
      atl_date: new Date(c.atl_date),
      roi: c.roi,
      last_updated: new Date(c.last_updated),
      price_change_percentage_1h_in_currency: c.price_change_percentage_1h_in_currency,
      price_change_percentage_30d_in_currency: c.price_change_percentage_30d_in_currency,
      price_change_percentage_7d_in_currency: c.price_change_percentage_7d_in_currency,
    }));

    // Connect to MongoDB using the connect() method
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
    } else {
      console.error('MONGODB_URI environment variable is not defined');
    }
    
    // Save the coins to the database
    await Coin.insertMany(coins);

    // Disconnect from MongoDB
    await mongoose.disconnect();

    res.status(200).json({ message: `Successfully inserted ${coins.length} coins into the database` });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while inserting coins into the database' });
  }
};

export default handler;