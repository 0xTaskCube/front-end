import { MongoClient, ServerApiVersion, Db, Collection } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db: Db | null = null;

export async function connectToDatabase() {
  try {
    if (!db) {
      await client.connect();
      db = client.db('TaskCube');
      console.log("Successfully connected to MongoDB!");
    }
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}

export async function getUserCollection(): Promise<Collection> {
  const database = await connectToDatabase();
  return database.collection('users');
}
