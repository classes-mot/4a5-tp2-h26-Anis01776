import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;
  const uri = 'mongodb://localhost:27017/Tp2Web';
  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("Connexion a la db reussi");
  } catch (err) {
    console.error("Erreur dans la connexion avec mongoDb", err.message);
    process.exit(1);
  }
};
