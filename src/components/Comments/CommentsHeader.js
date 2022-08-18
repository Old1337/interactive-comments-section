import React from "react";
import convertTimeToString from "../../utility";

export default function CommentsHeader({ avatar, username, duration, me }) {
  const time =
    typeof duration === "number" ? convertTimeToString(duration) : duration;
  return (
    <div className="comment_header">
      <img className="comment_avatar" src={avatar} alt="" />
      <span className="comment_username">{username}</span>
      {me && <span className="comment_me">you</span>}

      <span className="comment_duration">{time}</span>
    </div>
  );
}
