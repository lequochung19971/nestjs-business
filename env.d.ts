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
    }
  }
}

export {};
