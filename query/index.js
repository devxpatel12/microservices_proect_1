import express from "express";

const app = express();
const PORT = 8003;

app.use(express.json());

// Data structure to store the data
const snippets = {};

app.get("/snippets", (req, res) => {
  return res.status(200).json(snippets);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "Snippet_Created") {
    const { id, title } = data;
    snippets[data.id] = { id, title, comments: [] };
  }
  if (type === "Comment_Created") {
    const { id, content, snippetId } = data;
    const snippet = snippets[snippetId];
    snippet.comments.push({ id, content });
  }

  return res.status(200).json({});
});

app.listen(PORT, () => {
  console.log(`Query server listen at port ${PORT}`);
});
