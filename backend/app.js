const express = require('express');
const qs      = require('qs');
const cors = require("cors");
const app = express();
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');
const order = require('./routes/orderRoutes');

app.use(
  cors({
    origin: "https://ecommerce-frontend-git-main-lakshit-tandons-projects.vercel.app/", // Vite dev server
    credentials: true,               // allow cookies
  })
);
app.use(express.json());

app.use(cookieParser());
app.set('query parser', str => qs.parse(str));
// routes imports
const product = require('./routes/productRoutes');
const user = require('./routes/userRoutes');
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// Middleware for error handling
app.use(errorMiddleware);
module.exports = app;