const express = require("express");
const cors = require("cors");
const donenv = require("dotenv").config();
const { router } = require("./routes/authRoute");
const { clipRouter } = require("./routes/clipRoute");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());

//middleware
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);


app.use("/", router);
app.use("/api", clipRouter);
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

const port = 8000;
app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
