const express = require("express");
const cors = require("cors");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");
let db;
const app = express();
app.use(express.json());
app.use(cors());
connectToDb((err) => {
  if (!err) {
    app.listen(3001, () => {
      console.log("listening on port 3001");
    });
    db = getDb();
  }
});

app.get("/todo", (req, res) => {
  let posts = [];
  db.collection("todo")
    .find()
    .sort({ id: 1 })
    .forEach((post) => posts.push(post))
    .then(() => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ error: "fetch the documents" });
    });
});

app.get("/category", (req, res) => {
  let posts = [];
  db.collection("category")
    .find()
    .sort({ id: 1 })
    .forEach((post) => posts.push(post))
    .then(() => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ error: "fetch the documents" });
    });
});

//Add
app.post("/todo", (req, res) => {
  db.collection("todo")
    .findOne({ id: Number(req.body.id) })
    .then((existingUser) => {
      if (existingUser) {
        res.status(409).json({ error: "Customer with this ID already exists" });
      } else {
        db.collection("todo")
          .insertOne({
            id: Number(req.body.id),
            Todo_name: req.body.Todo_name,
            Category: req.body.Category,
          })
          .then((result) => {
            res.status(201).json(result.value);
          })
          .catch((err) => {
            res.status(500).json({ error: "Could not create a document" });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not check for existing user" });
    });
});

app.delete("/todo/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  db.collection("todo")
    .deleteOne({ id: taskId })
    .then((result) => {
      if (result.deletedCount === 0) {
        res.status(404).json({ error: "Task not found" });
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to delete task" });
    });
});

// Update
app.put("/todo/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  db.collection("todo")
    .findOneAndUpdate(
      { id: taskId },
      {
        $set: {
          Todo_name: req.body.Todo_name,
        },
      },
      { returnOriginal: false }
    )
    .then((result) => {
      if (result.value === null) {
        res.status(404).json({ error: "Task not found" });
      } else {
        res.status(200).json(result.value);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to update task" });
    });
});

app.post("/category", (req, res) => {
  db.collection("category")
    .insertOne({
      Category: req.body.Category,
    })
    .then((result) => {
      res.status(201).json(result.value);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not create a document" });
    });
});
