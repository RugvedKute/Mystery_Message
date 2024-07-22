import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

async function dbConnection() {
  if (connection.isConnected) {
    console.log("Database is already connected");
    return;
  }

  try {
    console.log(process.env.MONGO_URI, "DB url");
    const db = await mongoose.connect(process.env.MONGO_URI || "", {});
    console.log(db.connection);

    connection.isConnected = db.connection[0];

    console.log("DB connected Successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default dbConnection;
