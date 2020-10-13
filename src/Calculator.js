import React, { useState, useEffect } from "react";

const Calculator = () => {
  // create a state variable to keep track of what number/operater was clicked
  // display the clicked number/operator on the screen
  // create a fetch request to send the state variable to the api
  // if = button is selected, make a request to the api to do he calcatation
  // when response returns, display the calculation on the screen
  const [buttonInput, setButtonInput] = useState(0);
  const [calcatationId, setCalculationId] = useState("");

  async function createCalculation() {
    try {
      const response = await fetch(
        "https://d5adb00a10e7.ngrok.io/calculations",
        {
          method: "POST",
        }
      );
      const data = await response.json();
      setCalculationId(data.id);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    createCalculation();
  }, []);

  async function sendToken(buttonInput) {
    setButtonInput(buttonInput);
    let payload = {};

    if (typeof buttonInput === "number") {
      payload = { type: "number", value: buttonInput };
    } else {
      payload = { type: "operator", value: buttonInput };
    }

    console.log("payload", payload);
    try {
      const response = await fetch(
        `https://d5adb00a10e7.ngrok.io/calculations/${calcatationId}/tokens`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  }

  async function getResult() {
    try {
      const response = await fetch(
        `https://d5adb00a10e7.ngrok.io/calculations/${calcatationId}/result`
      );
      const data = await response.json();

      setButtonInput(data.result);
      createCalculation();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div>
        <h2>{buttonInput}</h2>
      </div>
      <div>
        <div>
          <button onClick={() => sendToken(1)}>1</button>
          <button onClick={() => sendToken(2)}>2</button>
          <button onClick={() => sendToken(3)}>3</button>
        </div>
        <div>
          <button onClick={() => sendToken(4)}>4</button>
          <button onClick={() => sendToken(5)}>5</button>
          <button onClick={() => sendToken(6)}>6</button>
        </div>
        <div>
          <button onClick={() => sendToken(7)}>7</button>
          <button onClick={() => sendToken(8)}>8</button>
          <button onClick={() => sendToken(9)}>9</button>
        </div>
        <div>
          <button onClick={() => sendToken("+")}>+</button>
          <button onClick={() => sendToken("-")}>-</button>
          <button onClick={() => getResult()}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
