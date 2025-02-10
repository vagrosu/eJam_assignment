export declare global {
  namespace Express {
    interface Request {
      pagination?: {
        skip: number;
        take: number;
        page: number;
        pageSize: number;
      };
    }
  }
}
