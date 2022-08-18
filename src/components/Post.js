import React, { memo } from "react";

import useUpdateInput from "../Hooks/useUpdateInput";

function Post({ postComment }) {
  const [textValue, updateTextValue] = useUpdateInput("Add a comment...");

  const updateComment = (textValue) => {
    postComment(textValue);
  };

  return (
    <div className="post">
      <textarea
        aria-label="write your comment here"
        className="post_textarea"
        value={textValue}
        onChange={updateTextValue}
      />

      <div className="post_footer">
        <img className="post_image " src="avatars/image-juliusomo.png" alt="" />
        <button onClick={() => updateComment(textValue)} className="post_btn">
          SEND
        </button>
      </div>
    </div>
  );
}

export default memo(Post);
