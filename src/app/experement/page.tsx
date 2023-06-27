"use client";
import clsx from "clsx";

export default function MyComponent({ isActive }) {
  const buttonClasses = clsx("bg-blue-500", "text-white", {
    active: isActive,
    rounded: !isActive,
  });

  return <button className={buttonClasses}>Click me</button>;
}
