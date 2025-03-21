import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cors from "cors"


//config env
dotenv.config()

//database config
connectDB()


//rest object
const app = express();



//middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors()) // enable cors for all routes

//routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)
//increses the limit

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Ecommerce App MERN Project</h1>");
});

//PORT
const PORT = process.env.PORT || 8000;

//run listen

app.listen(PORT, () => {
  console.log(`server running on ${process.env.dev_mode} ${PORT} `);
});
