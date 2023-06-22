"use client";
import React, { useRef } from "react";

export default function MyComponent() {
  const nextElementRef = useRef(null);

  const handleClick = () => {
    // Обращаемся к следующему соседнему элементу с помощью рефа
    if (nextElementRef.current) {
      // Выполняем необходимые действия с элементом
      console.log(nextElementRef.current);
    }
  };

  return (
    <div>
      <div>Элемент 1</div>
      <div ref={nextElementRef}>Элемент 2</div>
      <button onClick={handleClick}>Получить следующий элемент</button>
    </div>
  );
}
