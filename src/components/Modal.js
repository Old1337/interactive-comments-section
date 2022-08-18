import React from "react";

import { motion } from "framer-motion";

const Modal = ({ setModal, deleteComment }) => {
  const hideMode = () => {
    setModal(false);
  };

  const variants = {
    open: { opacity: 1, scale: 1, x: "-50%", y: "-50%", rotate: 360 },
    closed: { opacity: 0, scale: 0, x: "100%" },
  };

  return (
    <>
      <motion.div
        className="modal"
        initial={"closed"}
        animate={"open"}
        exit={"closed"}
        variants={variants}
      >
        <span className="modal_title">Delete comment</span>
        <p className="modal_desc">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="modal_btns">
          <motion.button
            onClick={hideMode}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="modal_cancel "
          >
            no, cancel
          </motion.button>
          <motion.button
            onClick={deleteComment}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="modal_delete"
          >
            yes, delete
          </motion.button>
        </div>
      </motion.div>
      <div className="overlay"></div>
    </>
  );
};

export default Modal;
