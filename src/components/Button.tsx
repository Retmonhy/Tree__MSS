import React from "react";
import "./../styles/App.css";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  clickHand: () => void;
  title: string;
}
export const Button: React.FC<ButtonProps> = ({ clickHand, title, ...props }) => {
  return (
    <button onClick={clickHand} className={"btn " + props.className}>
      {title}
    </button>
  );
};
