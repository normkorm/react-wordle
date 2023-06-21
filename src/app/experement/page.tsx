"use client";
import React, { useRef } from "react";

const Counter = () => {
  const counterRef = useRef(0);

  const handleIncrement = () => {
    counterRef.current += 1;
  };

  return (
    <div>
      <p>Счетчик: {counterRef.current}</p>
      <button onClick={handleIncrement}>Увеличить</button>
    </div>
  );
};

export default Counter;
