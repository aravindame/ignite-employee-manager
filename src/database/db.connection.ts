import mongoose from 'mongoose';
import EmployeeModel from '@/models/employee';
import axios from 'axios';

/**
 * Handles database connectivity and configurations.
 *
 * @author Aravinda Meewalaarachchi
 */

const DB_USERNAME = process.env.DB_USERNAME, DB_PWD =  process.env.DB_PWD;


if (!DB_USERNAME || !DB_PWD) {
  throw new Error(
    'Please define the DB_USERNAME and DB_PWD environment variable inside .env.local',
  );
}

const MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PWD}@cluster0.jwrama9.mongodb.net/test`;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

// Check the cached before initializing a new instance.
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

/**
 * Establishes a connection with the MongoDB database using Mongoose.
 * If a connection is already established, it returns the existing connection from the cache.
 * If a connection is not already established, it creates a new connection using the provided MongoDB URI
 * and caches the connection for future use.
 * @returns {Promise<mongoose.Connection>} A promise that resolves to a mongoose.Connection object.
 */
async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  await initDb();
  return cached.conn;
}

/**
 * Initializes the database by checking if there are any employees in the EmployeeModel collection.
 * If there are no employees, it inserts the employees data from an external source.
 * @returns {Promise<void>} A promise that resolves to void.
 */
async function initDb() {
  const employees = await EmployeeModel.find({});
  const DB_INIT_DATA_IMPORT_SOURCE = process.env.DB_INIT_DATA_IMPORT_SOURCE || "";
  if (employees?.length === 0 && DB_INIT_DATA_IMPORT_SOURCE !== "") {
    const {data:{employees: payload}} = await axios.get(DB_INIT_DATA_IMPORT_SOURCE);
    await EmployeeModel.insertMany(Array.from(payload));
  }
}

export default dbConnect;
