//access env variables
require("dotenv").config();

//async errors

//exxpress setup
const express = require("express");
const app = express();

//include DB connection
const connectDB = require("./db/connect");

//error handling middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

//routing controllers
const productsRouter = require("./routes/products");

//port
const port = process.env.PORT || 3000;
//middleware json not used in the project just add for reminding
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});
app.use("/api/v1/products", productsRouter);
//products route middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    //connect to DB
    await connectDB(process.env.MONGO_URL);
    app.listen(
      port,
      console.log(`Server is listening to the port : ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
