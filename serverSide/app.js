const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./utils/DbConfig");
const { routeNotFound, errorHandler } = require("./middlewares/errorHandler");
const routes = require("./routes/index.js");
// const userRoute = require("./routes/userRoute");

// Load environment variables from .env file
dotenv.config();

// Create express instance
const app = express();

//Database connection
connectDB();

// PORT is the port number where the server will RUN
const PORT = process.env.PORT || 5000;

// Middlewares MIDDLEWARES 
app.use(cors(
  {
    // origin: "http://localhost:3000", // this is the frontend url
    origin: ["http://localhost:3000", "http://localhost:3001", "https://taskly-manager.netlify.app"],  
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }

));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api", routes);
// app.use('/api/user', userRoute);

// Error Handling
app.use(routeNotFound);
app.use(errorHandler);

app.get("/", (req, res) => {}); // this is the route

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
