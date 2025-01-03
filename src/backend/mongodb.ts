import mongoose from "mongoose";
import { ITransaction } from "@/lib/types";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

interface ConnectionStatus {
  isConnected: number;
}

const status: ConnectionStatus = {
  isConnected: 0,
};

export const connectDB = async () => {
  if (status.isConnected === 1) {
    return mongoose;
  }

  if (mongoose.connections.length > 0) {
    status.isConnected = mongoose.connections[0].readyState;
    if (status.isConnected === 1) {
      return mongoose;
    }
    await mongoose.disconnect();
  }

  // Set up mongoose configuration
  mongoose.set("strictQuery", true);

  // Connect to MongoDB
  const db = await mongoose.connect(uri);
  status.isConnected = db.connections[0].readyState;

  return mongoose;
};

const TransactionSchema = new mongoose.Schema<ITransaction>({
  signature: { type: String, required: true, unique: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  amount: { type: String, required: true },
  slot: { type: Number, required: true },
  blockTime: { type: Number, required: false },
  activity_type: { type: String, required: true },
});

export const Transaction =
  mongoose.models.Transaction ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);
