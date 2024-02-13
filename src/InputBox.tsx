import React from "react";
import "./App.css";

interface InputBoxProps {
  operator: string;
  previousResult: number|null;
  inputValue: string;
  setInputValue:(value: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({operator,previousResult,inputValue,setInputValue}) => {
  const displayValue = operator ? previousResult.toString() + operator + inputValue : previousResult.toString();

  return (
    <div className="inputbox">
      <input
        type="text"
        value={displayValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
    </div>
  );
};

export default InputBox;
