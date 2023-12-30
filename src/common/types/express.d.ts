declare namespace Express {
  export interface Request {
    getCsrfToken?: () => string;
    ignoreCsrf?: boolean;
  }
}
