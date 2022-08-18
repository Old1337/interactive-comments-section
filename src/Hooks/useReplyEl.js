import { useState } from "react";

const useReplyEl = (addReply) => {
  const [replyEl, setReplyEl] = useState(false);

  const showReply = () => {
    setReplyEl(true);
  };

  const handleReply = (id, content, username) => {
    addReply(id, content, username);
    setReplyEl(false);
  };

  return [replyEl, showReply, handleReply];
};

export default useReplyEl;
