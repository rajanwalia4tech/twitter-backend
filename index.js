import dotenv from "dotenv";
import { app } from "./app.js";
import databaseConnection from "./utils/db.js";

dotenv.config({ path: "./.env" });

databaseConnection()
  .then(() => {
    console.log("Database connected");

    // Listen for an event such as 'error' or similar
    app.on("error", (e) => {
      console.log("Error in database connection -- ", e);
      throw e;
    });

    // Start the server if database connection is successful
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error in database connection ", err);
  });
