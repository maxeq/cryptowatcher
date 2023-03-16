// passport/localStrategy.ts
import { Strategy as LocalStrategy } from 'passport-local';
import passport, { PassportStatic } from 'passport';
import { findUserByEmail, validateUserPassword, findUserById, User } from '../lib/user';

const configurePassport = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email: string, password: string, done) => {
      try {
        const user: User | null = await findUserByEmail(email);
        if (!user) {
          return done(null, false, { message: 'Email is not registered' });
        }

        const isValidPassword: boolean = await validateUserPassword(password, user.password);
        if (!isValidPassword) {
          return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user: User, done) => done(null, user._id));
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user: User | null = await findUserById(id);
      if (user === null) {
        return done(null, null);
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export default configurePassport;
