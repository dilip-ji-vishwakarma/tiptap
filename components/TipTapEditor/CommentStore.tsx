import React from "react";

interface CommentDisplayProps {
  comments: string[];
}

export const CommentStore = ({ comments }: CommentDisplayProps) => {
  return (
    <div className="comments">
      <h3>Comments:</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};
