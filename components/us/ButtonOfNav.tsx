import React from "react";

interface ButtonOfNavProps {
  text: string;
}

export const ButtonOfNav = ({ text }: ButtonOfNavProps) => {
  return (
    <button className="px-4 py-2 hover:text-blue-500 transition-colors">
      {text}
    </button>
  );
};
