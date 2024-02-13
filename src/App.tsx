import { useState } from "react";
import "./App.css";
import InputBox from "./InputBox";
import Key from "./Key";

 
const Calculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [operator, setOperator] = useState<string>("");
  const [previousResult, setPreviousResult] = useState<number|null>(null);
  const currentNumber = Number(inputValue);
  let result: number;

  const handleKeyClick = (value: string) => {
    switch (value) {
      case "Del":
        handleDelete();
        break;
      case "C":
        handleClear();
        break;
      case "=":
        handleCalculation();
        break;
      default:
        handleNumberOrOperatorClick(value);
    }
  };
  
  const handleNumberOrOperatorClick = (value:string) => {

    if (!isNaN(Number(value))) {
      setInputValue((prevInput) =>
        prevInput === "0" ? value : prevInput + value
      );
    } else {
      setOperator(value);
      setPreviousResult(Number(inputValue));
      setInputValue("");
    }
  };

  const handleClear = () => {
    if (inputValue || operator || previousResult) {
      setInputValue("");
      setOperator("");
      setPreviousResult(null);
    }
  };

  const handleDelete = () => {
    if (inputValue) {
      setInputValue(inputValue.slice(0, -1));
    }
  };

  const addTwoNumbers = () => {
    result = previousResult + currentNumber;
  }

  const subtractTwoNumbers = () => {
    result = previousResult - currentNumber;
  };

  const handleCalculation = () => {
    if (operator !== null && previousResult !== null) {
     switch (operator) {
        case "+":
          addTwoNumbers();
          break;
        case "-":
          subtractTwoNumbers();
          break;
        default:
          return;
      }
      setInputValue(result.toString());
      setPreviousResult(result);
      setOperator("");
    }
  };

  const keys = ["7","8","9","4","5","6","1","2","3","0","+","-","=","C","Del"];

  return (
    <>
      <h2>Calculator</h2>
      <div className="inputbox">
        <InputBox
          operator={operator}
          previousResult={previousResult || 0}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {keys.map((key, index) => (<Key key={index} value={key} onClick={() => handleKeyClick(key)} />))}
      </div>
    </>
  );
};
export default Calculator;
