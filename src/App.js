import { useState, useCallback, useEffect } from "react";

import { nanoid } from "nanoid";

import "./App.css";

import { motion, AnimatePresence } from "framer-motion";

import data from "./data/data.json";

import Comment from "./components/Comments/Comment";
import Post from "./components/Post";
import Modal from "./components/Modal";

function App() {
  const [comments, setComments] = useState(
    () => JSON.parse(localStorage.getItem("comments")) || data.comments
  );
  const [isModalVisible, SetisModalVisible] = useState(false);
  const [clickedComment, setClickedComment] = useState({ id: "", type: "" });

  useEffect(() => {
    window.localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const increaseUpvote = (id, type) => {
    if (type === "comment") {
      const updatedComment = comments.map((comment) =>
        comment.id === id ? { ...comment, score: comment.score + 1 } : comment
      );

      setComments(updatedComment);
    } else {
      const updatedReply = comments.map((comment) => ({
        ...comment,
        replies: comment.replies.map((reply) =>
          reply.id === id ? { ...reply, score: reply.score + 1 } : reply
        ),
      }));

      setComments(updatedReply);
    }
  };

  const decreaseUpvote = (id, type) => {
    if (type === "comment") {
      const updatedComment = comments.map((comment) =>
        comment.id === id ? { ...comment, score: comment.score - 1 } : comment
      );

      setComments(updatedComment);
    } else {
      const updatedReply = comments.map((comment) => ({
        ...comment,
        replies: comment.replies.map((reply) =>
          reply.id === id ? { ...reply, score: reply.score - 1 } : reply
        ),
      }));

      setComments(updatedReply);
    }
  };

  const addReply = (id, content, username) => {
    const newReply = {
      id: nanoid(),
      content: content.replace(`@${username}`, ""), // remove the mention in the textarea and automatically add it on post to prevent mention duplication
      createdAt: new Date().getTime(),
      ownerId: id,
      score: 0,
      me: true,
      type: "reply",
      replyingTo: username,
      user: {
        image: "avatars/image-juliusomo.png",
        username: "juliusomo",
      },
    };

    const updatedReplies = comments.map((comment) => {
      if (comment.id === id)
        return { ...comment, replies: [...comment.replies, newReply] };

      return comment;
    });

    setComments(updatedReplies);
  };

  const postComment = useCallback(
    (textValue) => {
      const newComment = {
        id: nanoid(),
        content: textValue,
        createdAt: new Date().getTime(),
        type: "comment",
        score: 0,
        me: true,
        user: {
          image: "avatars/image-juliusomo.png",
          username: "juliusomo",
        },
        replies: [],
      };
      setComments([...comments, newComment]);
    },
    [comments]
  );

  const showModal = () => {
    SetisModalVisible(true);
  };

  const setComment = (id, type) => {
    setClickedComment({ id: id, type: type });
  };

  const deleteComment = () => {
    SetisModalVisible(false);

    if (clickedComment.type === "comment") {
      const updatedComment = comments.filter(
        (comment) => comment.id !== clickedComment.id
      );

      setComments(updatedComment);
    } else {
      const updatedReply = comments.map((comment) => ({
        ...comment,
        replies: comment.replies.filter(
          (reply) => reply.id !== clickedComment.id
        ),
      }));

      setComments(updatedReply);
    }
  };

  const updateComment = (id, type, text) => {
    if (type === "comment") {
      const updatedComment = comments.map((comment) =>
        comment.id === id ? { ...comment, content: text } : comment
      );

      setComments(updatedComment);
    } else {
      const updatedReply = comments.map((comment) => ({
        ...comment,
        replies: comment.replies.map((reply) =>
          reply.id === id ? { ...reply, content: text } : reply
        ),
      }));

      setComments(updatedReply);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <main className="main">
      <motion.div
        className="container"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              upvote={increaseUpvote}
              downvote={decreaseUpvote}
              addReply={addReply}
              showModal={showModal}
              setComment={setComment}
              updateComment={updateComment}
            />
          );
        })}

        <Post postComment={postComment} />
      </motion.div>
      <AnimatePresence>
        {isModalVisible && (
          <Modal setModal={SetisModalVisible} deleteComment={deleteComment} />
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
