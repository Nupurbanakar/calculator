import React, { useEffect } from "react";
import "./App.css";

interface InputBoxProps {
  operator: string;
  previousResult: number|null;
  inputValue: string;
  setInputValue:(value: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({operator,previousResult,inputValue,setInputValue}) => {
const isCalculationMode = operator !== "" && previousResult !== null;
  const displayValue = isCalculationMode ? `${previousResult}${operator}${inputValue}` : inputValue;

  useEffect(() => {
    if (isNaN(inputValue)) {
      alert("Enter Numbers only!")
    }
  },[inputValue]);

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
