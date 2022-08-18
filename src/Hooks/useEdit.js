import { useState } from "react";

const useEdit = (updateComment) => {
  const [isEditing, setisEditing] = useState(false);

  const showEdit = () => {
    setisEditing(true);
  };

  const handleUpdateComment = (id, type, content) => {
    updateComment(id, type, content);
    setisEditing(false);
  };

  return [isEditing, showEdit, handleUpdateComment];
};

export default useEdit;
