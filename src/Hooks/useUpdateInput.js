import { useState } from "react";

const useUpdateInput = (intialValue) => {
  const [textValue, setTextValue] = useState(intialValue);

  const updateTextValue = (e) => {
    const { value } = e.target;
    setTextValue(value);
  };

  return [textValue, updateTextValue, setTextValue];
};

export default useUpdateInput;
