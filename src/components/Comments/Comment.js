import React from "react";

import Replies from "../Replies";
import Reply from "../Reply";

import CommentsFooter from "./CommentsFooter";
import CommentsHeader from "./CommentsHeader";

import useReplyEl from "../../Hooks/useReplyEl";
import useUpdateInput from "../../Hooks/useUpdateInput";
import useEdit from "../../Hooks/useEdit";

import { motion, AnimatePresence } from "framer-motion";

export default function Comments({
  comment,
  upvote,
  downvote,
  addReply,
  showModal,
  setComment,
  updateComment,
}) {
  const [replyEl, showReply, handleReply] = useReplyEl(addReply);
  const [textValue, updateTextValue] = useUpdateInput(comment.content);
  const [isEditing, showEdit, handleUpdateComment] = useEdit(updateComment);

  const handleDelete = (id, type) => {
    showModal();
    setComment(id, type);
  };

  const item = {
    hidden: { scale: 0, opacity: 0, y: -1000 },
    show: { scale: 1, opacity: 1, y: 0 },
  };
  return (
    <motion.div
      layout
      style={{ order: -comment.score }}
      className="comment_container"
      variants={item}
    >
      <div className="comment">
        <CommentsHeader comment={comment} />

        {!isEditing && (
          <>
            <p className="comment_content">{comment.content}</p>

            <CommentsFooter
              comment={comment}
              upvote={() => upvote(comment.id, comment.type)}
              downvote={() => downvote(comment.id, comment.type)}
              handleDelete={() => handleDelete(comment.id, comment.type)}
              showReply={showReply}
              showEdit={showEdit}
            />
          </>
        )}

        {isEditing && (
          <>
            <textarea
              aria-label="edit your comment here"
              className="update_textarea"
              value={textValue}
              onChange={updateTextValue}
            />

            <button
              onClick={() =>
                handleUpdateComment(comment.id, comment.type, textValue)
              }
              className="update_btn"
            >
              UPDATE
            </button>
          </>
        )}
      </div>
      <AnimatePresence>
        {replyEl && (
          <Reply
            id={comment.id}
            type={comment.type}
            replyTo={comment.user.username}
            addReply={handleReply}
          />
        )}
      </AnimatePresence>
      {comment.replies.length > 0 && (
        <div className="comment_replies">
          {comment.replies.map((reply) => (
            <Replies
              key={reply.id}
              reply={reply}
              addReply={addReply}
              upvote={upvote}
              downvote={downvote}
              handleDelete={handleDelete}
              updateComment={updateComment}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
