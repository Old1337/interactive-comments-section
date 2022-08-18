import React from "react";
import convertTimeToString from "../../utility";

export default function CommentsHeader({ comment }) {
  const time =
    typeof comment.createdAt === "number"
      ? convertTimeToString(comment.createdAt)
      : comment.createdAt;
  return (
    <div className="comment_header">
      <img className="comment_avatar" src={comment.user.image} alt="" />
      <span className="comment_username">{comment.user.username}</span>
      {comment.me && <span className="comment_me">you</span>}

      <span className="comment_duration">{time}</span>
    </div>
  );
}
