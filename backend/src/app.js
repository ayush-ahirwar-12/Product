const express = require("express")
const app = express();
const cookie = require("cookie-parser")
const authRouter = require("../src/routes/auth.route")
const productRouter = require("../src/routes/product.route")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors")

app.use(cookie());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use("/api/auth",authRouter);

app.use("/api",productRouter)






module.exports=app;