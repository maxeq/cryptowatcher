import axios from 'axios';
import mongoose, { Document, Model, Schema, ConnectOptions } from 'mongoose';

// Define the interface for the data
interface ICoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_1h: number;
  price_change_percentage_7d: number;
  price_change_percentage_30d: number;
  last_updated: string;
}

// Define the interface for the data after parsing
interface ICoin extends Document {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_1h: number;
  price_change_percentage_7d: number;
  price_change_percentage_30d: number;
  last_updated: Date;
}

// Define the schema for the data
const coinSchema: Schema = new mongoose.Schema({
  id: { type: String, unique: true },
  symbol: String,
  name: String,
  image: String,
  current_price: Number,
  market_cap: Number,
  price_change_percentage_1h: Number,
  price_change_percentage_7d: Number,
  price_change_percentage_30d: Number,
  last_updated: Date
});

// Create a mongoose model for the schema
const Coin: Model<ICoin> = mongoose.model<ICoin>('Coin', coinSchema);

// Connect to MongoDB using the connect() method
mongoose.connect('mongodb+srv://max:maxmaxmax@cluster0.5tkzmg9.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    poolSize: parseInt(process.env.POOL_SIZE!),
  } as ConnectOptions)
  .then((res) => {
    console.log(
      'Connected to Distribution API Database - Initial Connection'
    );
  })
  .catch((err) => {
    console.log(
      `Initial Distribution API Database connection error occured -`,
      err
    );
  });


// Make an HTTP GET request to the API
axios.get<ICoinData[]>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=1h,7d,30d')
  .then(response => {
    // Parse the response into an array of coins
    const coins = response.data.map(c => new Coin({
      id: c.id,
      symbol: c.symbol,
      name: c.name,
      image: c.image,
      current_price: c.current_price,
      market_cap: c.market_cap,
      price_change_percentage_1h: c.price_change_percentage_1h,
      price_change_percentage_7d: c.price_change_percentage_7d,
      price_change_percentage_30d: c.price_change_percentage_30d,
      last_updated: new Date(c.last_updated)
    }));

    // Save the data to MongoDB
    Promise.all(coins.map(c => c.save()))
      .then(() => console.log('Data saved to MongoDB'))
      .catch(err => console.error(err))
      .finally(() => mongoose.disconnect());
  })
  .catch((error: Error) => { // Add type annotation for the error parameter
    console.error(error);
  });
