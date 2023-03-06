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

const handler: (req: NextApiRequest, res: NextApiResponse) => void = async (req, res) => {
  try {
    // Use the CoinGecko API to get the top 100 coins by market cap
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false,
      },
    });
    const coins = response.data;
    // Loop through the coins returned by the API and add them to the database
    const coinDocs = coins.map((coin: any) => ({
      id: coin.id,
      dbDateAdded: new Date(),
      symbol: coin.symbol,
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      market_cap_rank: coin.market_cap_rank,
      fully_diluted_valuation: coin.fully_diluted_valuation,
      total_volume: coin.total_volume,
      high_24h: coin.high_24h,
      low_24h: coin.low_24h,
      price_change_24h: coin.price_change_24h,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      market_cap_change_24h: coin.market_cap_change_24h,
      market_cap_change_percentage_24h: coin.market_cap_change_percentage_24h,
      circulating_supply: coin.circulating_supply,
      total_supply: coin.total_supply,
      max_supply: coin.max_supply,
      ath: coin.ath,
      ath_change_percentage: coin.ath_change_percentage,
      ath_date: new Date(coin.ath_date),
      atl: coin.atl,
      atl_change_percentage: coin.atl_change_percentage,
      atl_date: new Date(coin.atl_date),
      roi: coin.roi,
      last_updated: new Date(coin.last_updated),
      price_change_percentage_1h_in_currency: coin.price_change_percentage_1h_in_currency,
      price_change_percentage_30d_in_currency: coin.price_change_percentage_30d_in_currency,
      price_change_percentage_7d_in_currency: coin.price_change_percentage_7d_in_currency,
    }));
    await Coin.create(coinDocs);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};

export default handler;
