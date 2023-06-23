import React, { useRef } from "react";

export const FormInputs = () => {
  const inputRefs = Array.from({ length: 25 }, () => useRef(null));
  const handleFocus = (e, index) => {
    const regex = /^[А-яЁё]+$/;
    if (!regex.test(e.target.value)) {
      inputRefs[index].current.value = "";
    } else {
      inputRefs[index + 1]?.current.removeAttribute("readOnly", "readOnly");
      if (index !== inputRefs.length - 1)
        inputRefs[index].current.setAttribute("readOnly", "readOnly");
      inputRefs[index].current.value =
        inputRefs[index].current.value.toUpperCase();
      inputRefs[index + 1]?.current.focus();
    }
  };

  const handleKeyFocus = (e, index) => {
    if (e.code === "Backspace" && inputRefs[index].current.value.length === 0) {
      if (index !== 0)
        inputRefs[index].current.setAttribute("readOnly", "readOnly");
      inputRefs[index - 1]?.current.removeAttribute("readOnly", "readOnly");
      inputRefs[index - 1]?.current.focus();
    }
  };

  const checkWord = (word) => {
    if (word.length === 5) console.log("good");
  };
  return (
    <form className="grid grid-cols-5 gap-2">
      {inputRefs.map((ref, index) => (
        <input
          key={index}
          className="border-2 text-center w-14 h-14 focus:outline-none font-black"
          readOnly={index !== 0}
          autoFocus={index === 0}
          maxLength={1}
          ref={ref}
          onChange={(e) => handleFocus(e, index)}
          onKeyDown={(e) => handleKeyFocus(e, index)}
        />
      ))}
    </form>
  );
};

export default FormInputs;
