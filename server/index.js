import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
import chatRoutes from "./routes/ChatAi.js";

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:3000",
        "https://piyush-stackoverflowclone.netlify.app",
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
// app.use(function (req, res, next) {
//   // res.header("Access-Control-Allow-Origin", "*");
//   const allowedOrigins = [
//     "http://localhost:3000",
//     "https://piyush-stackoverflowclone.netlify.app/",
//   ];
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-credentials", true);
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
//   next();
// });

app.use("/chat", chatRoutes);
app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);

let generatedOTP = "";
// Generate OTP
app.get("/api/generate-otp", async (req, res) => {
  generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
   const emailId = req.query.email;
  try {
    const response = await axios.post(
      "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
      {
        personalizations: [
          {
            to: [{ email: emailId }],
            subject: "OTP Verification",
          },
        ],
        from: { email: "rimefaj103@niback.com" }, // Replace with your email
        content: [
          {
            type: "text/plain",
            value: `Your OTP: ${generatedOTP}`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
          "X-RapidAPI-Key": "9142dae4d6msh08bf27d6ef45054p110820jsn6685d8e4efb8",
        },
      }
    );

    console.log("OTP sent");
    res.json({ otp: generatedOTP });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Error sending OTP" });
  }
});

// Verify OTP
app.post("/api/verify-otp", (req, res) => {
  const userInput = req.body.otp;

  if (userInput === generatedOTP) {
    // Codes match, return success status
    res.sendStatus(200);
  } else {
    // Codes don't match, return error status
    res.sendStatus(400);
  }
});

app.get("/", (req, res) => {
  res.send("This is a stack overflow clone API");
});

const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.CONNECTION_URL;

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
  });



