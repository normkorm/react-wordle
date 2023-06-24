import React, { useRef, useState } from "react";

export const FormInputs = () => {
  const [word, setWord] = useState("");
  const inputRefs = Array.from({ length: 25 }, () => useRef(null));
  const handleFocus = (e, index) => {
    const regex = /^[А-яЁё]+$/;
    if (!regex.test(e.target.value)) {
      inputRefs[index].current.value = "";
    } else {
      if ((index + 1) % 5 !== 0) {
        setWord((prevState) => prevState + e.target.value);
        inputRefs[index + 1]?.current.removeAttribute("disabled", "disabled");
        inputRefs[index + 1]?.current.focus();
        inputRefs[index].current.setAttribute("disabled", "disabled");
      }
      inputRefs[index].current.value =
        inputRefs[index].current.value.toUpperCase();
    }
  };
  const handleKeyFocus = (e, index) => {
    if (e.code === "Backspace" && inputRefs[index].current.value.length === 0) {
      if (index !== 0)
        inputRefs[index].current.setAttribute("disabled", "disabled");
      inputRefs[index - 1]?.current.removeAttribute("disabled", "disabled");
      inputRefs[index - 1]?.current.focus();
    }
    if (e.code === "Enter" && (index + 1) % 5 === 0) {
      inputRefs[index]?.current.setAttribute("disabled", "disabled");
      inputRefs[index + 1]?.current.removeAttribute("disabled", "disabled");
      inputRefs[index + 1]?.current.focus();
    }
  };
  return (
    <form className="grid grid-cols-5 gap-2">
      {inputRefs.map((ref, index) => (
        <input
          key={index}
          className="border-2 text-center w-14 h-14 focus:outline-none font-black"
          disabled={index !== 0}
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
