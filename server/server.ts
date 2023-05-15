import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";

import "./loadEnviornment";
import users from "./routes/user";

const connectionString = process.env.ATLAS_URI || "";

try {
  mongoose.connect(connectionString);
  console.log("success");
} catch (e) {
  console.error(e);
}

const PORT = process.env.PORT || 5050;
const app = express();

app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());

app.use("/user", users);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
  function (req, res) {
    // Successful authentication, redirect secrets.
    res.redirect("http://localhost:3000");
  }
);

app.get("/logout", function (req, res) {
  res.redirect("http://localhost:3000/");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
