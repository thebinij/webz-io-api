declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      LOG_LEVEL: string;
      NODE_ENV: "development" | "production";
      PORT: string;
      HOST: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
