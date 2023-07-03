import React, { useRef, useState } from "react";
import { allWords, getRandomWord } from "@/all-words/all-words";

export const FormInputs = () => {
  const [word, setWord] = useState("");
  const inputRefs = Array.from({ length: 25 }, () => useRef(null));
  const handleFocus = (e, index) => {
    const regex = /^[А-яЁё]+$/;
    if (!regex.test(e.target.value)) {
      inputRefs[index].current.value = "";
    } else {
      if ((index + 1) % 5 !== 0) {
        inputRefs[index + 1]?.current.removeAttribute("disabled", "disabled");
        inputRefs[index + 1]?.current.focus();
        inputRefs[index].current.setAttribute("disabled", "disabled");
      }
      inputRefs[index].current.value =
        inputRefs[index].current.value.toUpperCase();
      setWord((prevState) => prevState + e.target.value);
    }
  };
  const handleKeyFocus = (e, index) => {
    if (e.code === "Backspace") {
      setWord((prevState) => prevState.slice(0, word.length - 1));
    }
    if (
      e.code === "Backspace" &&
      inputRefs[index].current.value.length === 0 &&
      index % 5 !== 0
    ) {
      if (index !== 0)
        inputRefs[index].current.setAttribute("disabled", "disabled");
      inputRefs[index - 1]?.current.removeAttribute("disabled", "disabled");
      inputRefs[index - 1]?.current.focus();
    }
    if (
      e.code === "Enter" &&
      (index + 1) % 5 === 0 &&
      inputRefs[index].current.value.length > 0
    ) {
      if (allWords.includes(word.toLowerCase())) {
        inputRefs[index]?.current.setAttribute("disabled", "disabled");
        inputRefs[index + 1]?.current.removeAttribute("disabled", "disabled");
        inputRefs[index + 1]?.current.focus();
        setWord("");
        checkLetters(word, index);
      }
    }
  };
  console.log(getRandomWord);

  function checkLetters(result, ind) {
    const copyOfResult = [...result];
    const copyOfGetRandom = [...getRandomWord];
    copyOfResult.filter((oneLetter, i) => {
      if (oneLetter.toLowerCase() === copyOfGetRandom[i]) {
        inputRefs[ind - (4 - i)].current.classList.add("bg-green-600");
        copyOfResult[i] = null;
        copyOfGetRandom[i] = null;
      } else {
        copyOfResult[i] = oneLetter.toLowerCase();
      }
    });
    for (let indexCopyOfResult in copyOfResult) {
      if (copyOfResult[indexCopyOfResult] !== null) {
        if (copyOfGetRandom.includes(copyOfResult[indexCopyOfResult])) {
          copyOfGetRandom[
            copyOfGetRandom.indexOf(copyOfResult[indexCopyOfResult])
          ] = null;
          inputRefs[ind - (4 - indexCopyOfResult)].current.classList.add(
            "bg-yellow-400"
          );
        } else {
          inputRefs[ind - (4 - indexCopyOfResult)].current.classList.add(
            "bg-slate-200"
          );
        }
      }
    }
  }

  const upperKeyBoard = ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з"];
  const simulateKeyPress = (e, ind) => {
    const enterKeyEvent = new Event("change");
    inputRefs[0].current.dispatchEvent(e.currentTarget.value);
  };

  return (
    <div>
      <div className="grid grid-cols-5 gap-2 mx-auto">
        {inputRefs.map((input, index) => (
          <input
            key={index}
            className="border-2 text-center w-12 h-12 focus:outline-none text-2xl font-bold sm:w-16 sm:h-16"
            disabled={index !== 0}
            autoFocus={index === 0}
            maxLength={1}
            ref={input}
            onChange={(e) => handleFocus(e, index)}
            onKeyDown={(e) => handleKeyFocus(e, index)}
            onBlur={(e) => cons}
          />
        ))}
      </div>
      <div className="flex justify-between">
        {upperKeyBoard.map((symbol, index) => (
          <button
            key={index}
            onClick={(e) => simulateKeyPress(e, index)}
            value={symbol}
          >
            {symbol}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormInputs;
