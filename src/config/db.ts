import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!); // Pas besoin des options supplémentaires
    console.log("MongoDB connecté avec succès !");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB :", error);
    process.exit(1); // Quitte l'application si la connexion échoue
  }
};

export default connectDB;

