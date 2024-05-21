import app from "./app";
import mongoose from "mongoose";
import config from "./config";

async function Main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`listening from port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

Main();
