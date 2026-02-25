

// You said:
// do my code have cookie for jwt

// ChatGPT said:
// From the code you shared earlier:

// import express from 'express'
// import dbConnection from './db.js'
// import userRouter from './routes/User.js'
// import cookieParser from 'cookie-parser';
// import dotenv from 'dotenv';

// const app=express();
// dotenv.config();
// app.use(express.json())
// app.use(cookieParser)
// const port=8080;

// dbConnection()
// app.use('/api/user',userRouter)

// app.listen(port,()=>{
//     console.log("server is listening");
// })
// ❌ Right now — No, JWT cookie is NOT properly set up
// There are two issues:

// 1️⃣ You are not actually using cookie-parser correctly
// You wrote:

// app.use(cookieParser)
// It should be:

// app.use(cookieParser())
// 👉 You must call the function.

// 2️⃣ I don't see JWT being stored in cookies
// To use JWT in cookies, your login controller should have something like this:

// import jwt from "jsonwebtoken";

// const token = jwt.sign(
//   { id: user._id },
//   process.env.JWT_SECRET,
//   { expiresIn: "1d" }
// );

// res.cookie("token", token, {
//   httpOnly: true,
//   secure: false, // true in production (https)
//   sameSite: "strict"
// });

// res.status(200).json({ message: "Login successful" });
// If you're only doing this:

// res.json({ token })
// Then ❌ it is NOT stored in cookies — it is just sent in response body.

// ✅ How to Check If Cookie Is Working
// In browser:

// Open DevTools

// Go to Application → Cookies

// Check if token is there

// In Postman:

// After login

// Go to Cookies section

// See if token exists

// 🔥 Final Answer
// ✔ If you are NOT using res.cookie() → then you are NOT using JWT cookies.

// ❌ From the server code you showed, cookies are not properly configured yet.

// If you want, send your login controller code — I'll check exactly what’s missing.


// You said:
// give me code in which cookie is there

// ChatGPT said:
// Good 🔥 I’ll give you a complete working JWT + Cookie authentication example for your Express backend.

// This includes:

// ✅ Register

// ✅ Login

// ✅ JWT generation

// ✅ JWT stored in httpOnly cookie

// ✅ Protected route

// ✅ Logout

// 1️⃣ Install Dependencies
// npm install express mongoose bcryptjs jsonwebtoken cookie-parser dotenv
// 2️⃣ server.js
// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import userRouter from "./routes/user.js";

// dotenv.config();

// const app = express();

// app.use(express.json());
// app.use(cookieParser());

// mongoose.connect(process.env.MONGO_URL)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// app.use("/api/user", userRouter);

// app.listen(8080, () => {
//   console.log("Server running on port 8080");
// });
// 3️⃣ models/User.js
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// export default mongoose.model("User", userSchema);
// 4️⃣ routes/user.js
// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const router = express.Router();


// // ✅ REGISTER
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword
//     });

//     res.status(201).json({ message: "User registered successfully" });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// // ✅ LOGIN (JWT in COOKIE)
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     // ✅ STORE TOKEN IN COOKIE
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false, // true in production (HTTPS)
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000
//     });

//     res.status(200).json({ message: "Login successful" });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// // ✅ PROTECTED ROUTE
// router.get("/profile", async (req, res) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) return res.status(401).json({ message: "Not authorized" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.id).select("-password");

//     res.status(200).json(user);

//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// });


// // ✅ LOGOUT
// router.post("/logout", (req, res) => {
//   res.cookie("token", "", { maxAge: 0 });
//   res.status(200).json({ message: "Logged out successfully" });
// });

// export default router;
// 5️⃣ .env File
// MONGO_URL=your_mongodb_connection_string
// JWT_SECRET=your_secret_key
// 🔥 How It Works
// User logs in

// JWT is created

// JWT is stored in httpOnly cookie

// Browser automatically sends cookie with every request

// Protected routes read token from req.cookies.token

// ⚠️ Important For Frontend (React)
// When using Axios:

// axios.post("http://localhost:8080/api/user/login", data, {
//   withCredentials: true
// });
// And backend must allow credentials if using CORS:

// import cors from "cors";

// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }));
// If you want, I can now give you:

// 🔐 Clean MVC structure version

// 🧠 Middleware-based auth

// 🚀 Production-ready secure setup

// 🎯 React frontend login/register with cookies

// Just tell me what level you want 😎




