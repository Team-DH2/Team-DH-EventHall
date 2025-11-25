import React from "react";

interface BottomNavButtonProps {
  text: string;
  active?: boolean;
  onClick?: () => void;
}

export const BottomNavButton = ({
  text,
  active = false,
  onClick,
}: BottomNavButtonProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center w-full group cursor-pointer"
      onClick={onClick}
    >
      <button
        className={`w-10 h-10 rounded-full mb-1 transition-colors ${
          active ? "bg-blue-600" : "bg-neutral-900 group-hover:bg-blue-600"
        }`}
      ></button>
      <span
        className={`text-[10px] transition-colors ${
          active
            ? "text-blue-600"
            : "text-neutral-400 group-hover:text-blue-600"
        }`}
      >
        {text}
      </span>
    </div>
  );
};
