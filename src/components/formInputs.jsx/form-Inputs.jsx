import React, { useRef } from "react";

export const FormInputs = () => {
  const inputRefs = useRef([]);
  const currentIndex = useRef(0);

  const handleFocus = (e, index) => {
    console.log(inputRefs);
    console.log(currentIndex);
  };

  const handleBackspace = (e, index) => {
    console.log(inputRefs);
    console.log(currentIndex);
  };

  return (
    <form className="grid grid-cols-5 gap-2">
      <input
        ref={(el) => (inputRefs.current[0] = el)}
        className="border-2 text-center w-20 h-20 focus:outline-none"
        autoFocus={true}
        maxLength={1}
        onChange={(e) => handleFocus(e, 0)}
        onKeyDown={(e) => handleBackspace(e, 0)}
      />
      <input
        ref={(el) => (inputRefs.current[1] = el)}
        className="border-2 text-center w-20 h-20 focus:outline-none"
        maxLength={1}
        onChange={(e) => handleFocus(e, 1)}
        onKeyDown={(e) => handleBackspace(e, 1)}
      />
      <input
        ref={(el) => (inputRefs.current[2] = el)}
        className="border-2 text-center w-20 h-20 focus:outline-none"
        maxLength={1}
        onChange={(e) => handleFocus(e, 2)}
        onKeyDown={(e) => handleBackspace(e, 2)}
      />
      <input
        ref={(el) => (inputRefs.current[3] = el)}
        className="border-2 text-center w-20 h-20 focus:outline-none"
        maxLength={1}
        onChange={(e) => handleFocus(e, 3)}
        onKeyDown={(e) => handleBackspace(e, 3)}
      />
      <input
        ref={(el) => (inputRefs.current[4] = el)}
        className="border-2 text-center w-20 h-20 focus:outline-none"
        maxLength={1}
        onChange={(e) => handleFocus(e, 4)}
        onKeyDown={(e) => handleBackspace(e, 4)}
      />
    </form>
  );
};

export default FormInputs;
