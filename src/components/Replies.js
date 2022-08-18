import { React } from "react";

import CommentsFooter from "./Comments/CommentsFooter";
import CommentsHeader from "./Comments/CommentsHeader";
import Reply from "./Reply";

import useReplyEl from "../Hooks/useReplyEl";
import useUpdateInput from "../Hooks/useUpdateInput";
import useEdit from "../Hooks/useEdit";

import { AnimatePresence } from "framer-motion";

export default function Replies({
  reply,
  upvote,
  downvote,
  addReply,
  handleDelete,
  updateComment,
}) {
  const [replyEl, showReply, handleReply] = useReplyEl(addReply);
  const [textValue, updateTextValue] = useUpdateInput(reply.content);
  const [isEditing, showEdit, handleUpdateComment] = useEdit(updateComment);

  return (
    <div className="reply_container">
      <div className="comment_reply">
        <CommentsHeader
          avatar={reply.user.image}
          username={reply.user.username}
          duration={reply.createdAt}
          me={reply.me}
        />

        {!isEditing && (
          <p className="comment_content">
            <span className="comment_mention">@{reply.replyingTo}</span>
            {reply.content}
          </p>
        )}

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
            onClick={() => handleUpdateComment(reply.id, reply.type, textValue)}
            className="update_btn"
          >
            UPDATE
          </button>
        )}

        {!isEditing && (
          <CommentsFooter
            score={reply.score}
            upvote={() => upvote(reply.id, reply.type)}
            downvote={() => downvote(reply.id, reply.type)}
            showReply={showReply}
            me={reply.me}
            handleDelete={() => handleDelete(reply.id, reply.type)}
            showEdit={showEdit}
          />
        )}
      </div>
      <AnimatePresence>
        {replyEl && (
          <Reply
            addReply={handleReply}
            id={reply.ownerId}
            type={reply.type}
            replyTo={reply.user.username}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
