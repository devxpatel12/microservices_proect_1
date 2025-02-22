import { randomBytes } from "crypto";
import { commentsDB } from "../db/index.js";

export const createComment = (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { text } = req.body;
  const snippetId = req.params.id;
  const comments = commentsDB[snippetId] || [];
 
  comments.push({commentId, text});
  commentsDB[snippetId] = comments;

  return res.status(201).json({success:true, comment:{commentId, text}, message:"Comment created."})
};

export const getCommentsBySnippetId = (req, res) => {
  console.log(req.params.id);
  
    return res.status(200).json(commentsDB[req.params.id] || []);
};
