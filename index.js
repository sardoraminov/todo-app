const express = require("express");
const { connect } = require("mongoose");
const todoRouter = require("./routes/todo");
const exphbs = require("express-handlebars");
const app = express();
require("dotenv").config();

const M_URL = process.env.M_URL;
connect(M_URL)
  .then(() => {
    console.log("Connected to database...");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));

const hbs = exphbs.engine({
  defaultLayout: "main",
  extname: ".hbs",
});

app.get("/", (req, res) => {
  res.redirect("/todos");
});

app.engine("hbs", hbs);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use("/todos", todoRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running. PORT: ${PORT}`));
