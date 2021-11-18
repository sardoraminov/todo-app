const router = require("express").Router();
const Todo = require("../models/Todo");

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 }).lean();
    res.render("home", { todoList: todos });
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  try {
    const newTodo = await new Todo(req.body);
    await newTodo.save();

    res.redirect("/todos");
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id).lean();
    res.render("update", { todo: todo });
  } catch (error) {
    res.json(error.message);
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    await todo.save();

    res.json({ msg: "Todo updated!" });
  } catch (error) {
    res.json(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ msg: "Todo deleted!" });
  } catch (error) {
    res.json(error.message);
  }
});

router.delete("/deleteAll", async (req, res) => {
  try {
    await Todo.deleteMany({});
    res.json({ msg: "All todos deleted!" });
  } catch (error) {
    res.json(error.message)
  }
});

module.exports = router;
