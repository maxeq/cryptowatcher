// passportTypes.d.ts
import { User } from './lib/user';

declare module 'passport' {
  interface PassportStatic {
    authenticate(
      strategy: string,
      options?: object,
      callback?: (error: any, user?: any, info?: any) => void
    ): any;

    serializeUser<TUser = User, TID = any>(
      fn: (user: TUser, done: (err: any, id?: TID) => void) => void
    ): void;

    deserializeUser<TUser = User | null, TID = any>(
      fn: (id: TID, done: (err: any, user?: TUser) => void) => void
    ): void;
  }
}
