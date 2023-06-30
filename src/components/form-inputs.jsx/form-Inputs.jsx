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

  // const molot = "молот";

  // function checkLetter(result, ind) {
  //   let newResult = [];
  //   for (let indexLetter in [...result]) {
  //     if ([...result][indexLetter].toLowerCase() === molot[indexLetter]) {
  //       newResult.push([...result][indexLetter]);
  //       inputRefs[ind - (4 - indexLetter)].current.classList.add("bg-teal-600");
  //     } else if (molot.includes([...result][indexLetter].toLowerCase())) {
  //       inputRefs[ind - (4 - indexLetter)].current.classList.add("bg-teal-400");
  //     }
  //   }
  // }

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
      if (
        copyOfResult[indexCopyOfResult] !== null &&
        copyOfGetRandom.includes(copyOfResult[indexCopyOfResult])
      ) {
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
    // copyOfResult.filter((oneLetter, i) => {
    //   if (copyOfGetRandom.includes(oneLetter)) {
    //     inputRefs[ind - (4 - i)].current.classList.add("bg-yellow-400");
    //   } else {
    //     inputRefs[ind - (4 - i)].current.classList.add("bg-slate-200");
    //   }
    // });
  }

  return (
    <form className="grid grid-cols-5 gap-2">
      {inputRefs.map((ref, index) => (
        <input
          key={index}
          className="border-2 text-center w-14 h-14 focus:outline-none text-2xl font-bold"
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
