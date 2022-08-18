import React from "react";

import { motion } from "framer-motion";

import useUpdateInput from "../Hooks/useUpdateInput";

export default function Reply({ replyTo, addReply, id }) {
  const [textValue, updateTextValue] = useUpdateInput(`@${replyTo}`);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="reply"
    >
      <textarea
        className="reply_textarea"
        onChange={updateTextValue}
        value={textValue}
      ></textarea>
      <div className="reply_footer">
        <img
          className="comment_avatar"
          src="avatars/image-juliusomo.png"
          alt=""
        ></img>
        <button
          onClick={() => addReply(id, textValue, replyTo)}
          className="reply_btn"
          aria-label="click to reply"
        >
          Reply
        </button>
      </div>
    </motion.div>
  );
}
