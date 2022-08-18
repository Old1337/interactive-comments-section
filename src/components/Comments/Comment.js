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
    hidden: { scaleX: 0, x: "-200%" },
    show: { scaleX: 1, x: 0 },
  };
  return (
    <motion.div className="comment_container" variants={item}>
      <div className="comment">
        <CommentsHeader
          avatar={comment.user.image}
          username={comment.user.username}
          duration={comment.createdAt}
        />

        {!isEditing && <p className="comment_content">{comment.content}</p>}

        {isEditing && (
          <textarea
            aria-label="edit your comment here"
            className="update_textarea"
            value={textValue}
            onChange={updateTextValue}
          />
        )}

        {isEditing && (
          <button
            onClick={() =>
              handleUpdateComment(comment.id, comment.type, textValue)
            }
            className="update_btn"
          >
            UPDATE
          </button>
        )}

        {!isEditing && (
          <CommentsFooter
            upvote={() => upvote(comment.id, comment.type)}
            downvote={() => downvote(comment.id, comment.type)}
            score={comment.score}
            showReply={showReply}
            me={comment.me}
            handleDelete={() => handleDelete(comment.id, comment.type)}
            showEdit={showEdit}
          />
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
              upvote={upvote}
              downvote={downvote}
              addReply={addReply}
              handleDelete={handleDelete}
              updateComment={updateComment}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
