import React from "react";
import "./App.css";

interface KeyProps {
  value: string;
  onClick: () => void;
}

const Key: React.FC<KeyProps> = ({ value, onClick }) => {
  return (
    <button className="key" onClick={onClick}>
      {value}
    </button>
  );
};

export default Key;
