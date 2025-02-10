import "dotenv/config";

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL);

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to DB established successfully");

    // TODO : migration files will be used in future to sync the table
    await sequelize.sync();
    console.log("All tables created successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default sequelize;
