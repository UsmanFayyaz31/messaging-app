import mongoose from "mongoose";
import passport from "passport";
const { Schema, model } = mongoose;

// @ts-ignore
import findOrCreate from "mongoose-findorcreate";
import passportLocalMongoose from "passport-local-mongoose";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

interface UserType {
  username: string;
  name: string;
  googleId: string;
  secret: string;
}

const userSchema = new Schema({
  username: String,
  name: String,
  googleId: String,
  secret: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err: string, user: UserType) => {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID ?? "",
      clientSecret: process.env.CLIENT_SECRET ?? "",
      callbackURL: "http://localhost:5050/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: { id: string },
      cb: Function
    ) => {
      // @ts-ignore
      User.findOrCreate(
        { googleId: profile.id, username: profile.id },
        (err: string, user: UserType) => {
          return cb(err, user);
        }
      );
    }
  )
);

export default User;
