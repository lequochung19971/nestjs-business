declare global {
  namespace NodeJS {
    interface ProcessEnv {
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
    }
  }
}

export {};
