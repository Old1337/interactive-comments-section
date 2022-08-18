import React from "react";

export default function CommentsFooter({
  comment,
  upvote,
  downvote,
  handleDelete,
  showReply,
  showEdit,
}) {
  return (
    <div className="comment_footer">
      <div className="comment_upvote">
        <button
          onClick={upvote}
          aria-label="click to increase upvotes"
          className="upvote--btn --btn-reset"
        >
          <img src="images/icon-plus.svg" alt="" />
        </button>
        <span className="comment_score">{comment.score}</span>
        <button
          onClick={downvote}
          aria-label="click to decrease upvotes"
          className="upvote--btn --btn-reset"
        >
          <img src="images/icon-minus.svg" alt="" />
        </button>
      </div>
      {!comment.me && (
        <button
          onClick={showReply}
          aria-label="click to reply"
          className="reply-btn --btn-reset"
        >
          <img src="images/icon-reply.svg" alt="" />
          Reply
        </button>
      )}

      {comment.me && (
        <div className="buttons_wrapper">
          <button
            onClick={handleDelete}
            aria-label="click to delete comment"
            className="delete--btn --btn-reset"
          >
            <img src="images/icon-delete.svg" alt="" />
            Delete
          </button>
          <button
            onClick={showEdit}
            aria-label="click to add comment"
            className="edit--btn --btn-reset"
          >
            <img src="images/icon-edit.svg" alt="" />
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
