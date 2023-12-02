const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database/dbConfig");

let PostsData = require("./postsData.json");

app.use(express.json());
app.use(cors());

/* ****** ROUTES ****** */

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/v2/feed", async (req, res) => {
  try {
    const searchFilter = req.query.searchFilter || "";

    const comments = (
      await pool.query(
        "SELECT * FROM comments WHERE name ILIKE $1 OR username ILIKE $1 OR comment ILIKE $1 ORDER BY id DESC",
        ["%" + searchFilter + "%"]
      )
    ).rows;

    const listOfPids = [...new Set(comments.map((item) => item.pid))];

    const query = {
      text: "SELECT * FROM posts WHERE id = ANY($1::int[]) OR name ILIKE $2 OR username ILIKE $2 OR content ILIKE $2 ORDER BY id DESC",
      values: [listOfPids, "%" + searchFilter + "%"],
    };

    const fetchPosts = (await pool.query(query)).rows;

    fetchPosts.forEach((item) => {
      item.comments = []; // Adding a new key "newKey" with value "New Value"
    });

    comments.forEach((comment) => {
      const post = fetchPosts.find((post) => post.id === comment.pid);
      if (post) {
        post.comments.push({
          id: comment.id,
          name: comment.name,
          username: comment.username,
          comment: comment.comment,
        });
      }
    });

    res.send(fetchPosts);
  } catch (error) {
    console.error(error);
  }
});

app.post("/v2/feed", async (req, res) => {
  try {
    const { name, username, content } = req.body;

    const newPost = await pool.query(
      "INSERT INTO posts (name, username, content) VALUES ($1, $2, $3) RETURNING *",
      [name, username, content]
    );

    res.send(newPost.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

// post request to add comment
app.post("/add/comment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, username, comment } = req.body;

    const newComment = await pool.query(
      "INSERT INTO comments (pid, name, username, comment) VALUES ($1, $2, $3, $4) RETURNING *",
      [id, name, username, comment]
    );

    res.send(newComment.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

app.get("/test", async (req, res) => {
  try {
    res.send("For testing");
  } catch (error) {
    console.error(error);
  }
});

module.exports = app;
