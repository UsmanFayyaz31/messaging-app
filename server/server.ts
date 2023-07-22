import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import "./loadEnviornment";
import users from "./Routes/user";
import authRoute from "./Routes/AuthRoute";

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
app.use('/uploads', express.static('uploads'));

app.use("/", authRoute);
app.use("/user", users);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
