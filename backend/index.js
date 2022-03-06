require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");
// middle ware
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handerler");
const authentication = require("./middleware/authentication");
// Routes
const authRoute = require("./routes/auth");
const chatRoute = require("./routes/chat");
const userRoute = require("./routes/user");
// ....
const PORT = process.env.PORT || 8000;
const connectDb = require("./db/db");
app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/chat", authentication, chatRoute);
app.use("/api/v1/user", authentication, userRoute);
app.get("/", async (req, res) => {
  res.send("InitialStage");
});

app.use(notFound);
// app.use(errorHandler);

(async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(PORT, console.log(`server listening on port ${PORT} `));
  } catch (error) {
    console.log(error);
  }
})();
