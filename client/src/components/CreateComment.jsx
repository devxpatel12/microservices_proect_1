import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateComment = ({ snippetId }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  const handleComment = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const res = await axios.post(
        `http://localhost:8002/api/v1/snippets/${snippetId}/comments`,
        { text }
      );
      // console.log("Comment posted successfully:", res.data);
     
      setComments([...comments, res.data.comment]);
      setText(""); // Clear the input field after successful submission
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8002/api/v1/snippets/${snippetId}/comments`
        );
        setComments(res.data);
      } catch (error) {
        console.log("Error fetching comment", error);
      }
    };
    fetchComments();
  }, []);

  return (
    <div>
      <ul>
        {comments.map((comment,index) => (
          <li key={index} className="pl-3 text-sm">{`${index+1}. ${comment.text}`}</li>
        ))}
      </ul>
      <form
        className="flex items-center justify-between mt-2"
        onSubmit={handleComment}
      >
        <input
          placeholder="Post comment..."
          className="border rounded px-2 py-1 outline-0"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="px-2 py-1 rounded bg-black cursor-pointer text-white"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreateComment;
