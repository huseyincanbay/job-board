export {};

declare global {
  namespace Express {
    interface Request {
      locals: {
        jwtPayload?: {
          userId?: number;
        };
      };
    }
  }
}
