import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import "./loadEnviornment";
import friendsRoute from "./Routes/FriendsRoute";
import authRoute from "./Routes/AuthRoute";
import messageRoute from "./Routes/Messages";

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
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/", authRoute);
app.use("/friends", friendsRoute);
app.use("/messages", messageRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
