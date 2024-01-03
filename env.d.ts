declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_VERSION: string;
      POSTGRES_URL: string;
      POSTGRES_USER: string;
      POSTGRES_HOST: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DATABASE: string;
      POSTGRES_PORT: number;
      ACCESS_TOKEN_EXPIRATION_TIME: number;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      COOKIE_SECRET: string;
      VERCEL_BLOB_READ_WRITE_TOKEN: string;
    }
  }
}

export {};
