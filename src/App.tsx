import { useEffect, useState } from "react";
import "./App.css";
import InputBox from "./InputBox";
import Key from "./Key";


const Calculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [operator, setOperator] = useState<string>("");
  const [previousResult, setPreviousResult] = useState<number | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const currentNumber = Number(inputValue);
  let result: number;

  useEffect(() => {
    if (operator === "+") {
      document.title = "Addition";
    } else if (operator === "-") {
      document.title = "Subtraction";
    } else {
      document.title = "Calculator";
    }
  }, [operator]);

  //  useEffect(() => {
  //    try {
  //      localStorage.setItem("history", JSON.stringify(history));
  //    } catch (error) {
  //      console.error(error);
  //    }
  //  }, [history]);
  
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
        updateHistory(value);
        break;
      default:
        handleNumberOrOperatorClick(value);
    }
  };
  
  useEffect(() => {
    const handleKeyPress = (event: { key: any; }) => {
      const { key } = event;
      if ((Number(key)) || ["+", "-"].includes(key)) {
        handleKeyClick(key);
      } else if (key === "Enter") {
        handleKeyClick("=");
      }
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => {
    document.removeEventListener("keypress", handleKeyPress);
    };
  });

  
  const handleNumberOrOperatorClick = (value:string) => {

    if (!isNaN(Number(value))) {
      setInputValue((prevInput) =>
        prevInput == "0" ? value : prevInput + value
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
   if (previousResult !== null) {
     return previousResult + currentNumber;
   }
   return 0; 
  }

  const subtractTwoNumbers = () => {
   if (previousResult !== null) {
     return previousResult - currentNumber;
   }
   return 0; 
  };

  const handleCalculation = () => {
    if (operator !== null && previousResult !== null) {
     switch (operator) {
        case "+":
          result=addTwoNumbers();
          break;
        case "-":
          result=subtractTwoNumbers();
          break;
        default:
          return;
      }
      setInputValue(result.toString());
      setPreviousResult(result);
      setOperator("");
    }
  };

  const updateHistory = (value:string) => {
      setHistory((prevHistory) => [ ...prevHistory, `${previousResult}${operator}${inputValue}${value}${result}` ]);
  }

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
        {keys.map((key, index) => (
          <Key key={index} value={key} onClick={() => handleKeyClick(key)} />
        ))}
      </div>
      <button onClick={() => console.log(history)}>Show History</button>
    </>
  );
};
export default Calculator;
