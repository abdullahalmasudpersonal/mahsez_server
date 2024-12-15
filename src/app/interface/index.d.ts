import { JwtPayload } from 'jsonwebtoken';
import 'socket.io';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

declare module 'socket.io' {
  interface Socket {
    userId?: string;
  }
}
