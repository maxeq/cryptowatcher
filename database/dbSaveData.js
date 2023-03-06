const axios = require('axios');
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the interface for a coin
const coinSchema = new Schema({
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
const Coin = mongoose.model('Coin', coinSchema);

// Make an HTTP GET request to the API
axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=1h,7d,30d')
  .then((response) => {
    const coins = response.data.map((c) => new Coin({
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
    mongoose.connect('mongodb+srv://max:maxmaxmax@cluster0.5tkzmg9.mongodb.net/data', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => {
        console.log('Connected to MongoDB');

        // Save the coins to the database
        Coin.insertMany(coins)
          .then(() => {
            console.log(`Successfully inserted ${coins.length} coins into the database`);
            // Disconnect from MongoDB
            mongoose.disconnect();
          })
          .catch((err) => {
            console.log('Error inserting coins into the database:', err);
            // Disconnect from MongoDB
            mongoose.disconnect();
          });
      })
      .catch((err) => {
        console.log(`MongoDB connection error occurred:`, err);
      });

  })  