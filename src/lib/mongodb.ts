import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

const options = {
  tls: true,
  serverSelectionTimeoutMS: 5000,
};

const client = new MongoClient(uri, options);
const clientPromise = client.connect();

export default clientPromise;