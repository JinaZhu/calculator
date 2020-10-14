import React, { useState, useEffect } from "react";
import PreviousCal from "./PreviousCal";

const Calculator = () => {
  // create a state variable to keep track of what number/operater was clicked
  // display the clicked number/operator on the screen
  // create a fetch request to send the state variable to the api
  // if = button is selected, make a request to the api to do he calcatation
  // when response returns, display the calculation on the screen
  const [buttonInput, setButtonInput] = useState(0);
  const [calcatationId, setCalculationId] = useState("");
  const [previousCal, setPreviousCal] = useState({});

  const base_url = "https://89bcad46d253.ngrok.io/calculations";
  async function createCalculation() {
    try {
      const response = await fetch(base_url, {
        method: "POST",
      });
      const data = await response.json();
      setCalculationId(data.id);
      //   const new_previousCal = previousCal;
      //   new_previousCal[data.id] = [];
      //   setPreviousCal(new_previousCal);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    if (!calcatationId) {
      createCalculation();
    }
  }, []);

  async function sendToken(buttonInput) {
    setButtonInput(buttonInput);
    let payload = {};

    if (typeof buttonInput === "number") {
      payload = { type: "number", value: buttonInput };
    } else {
      payload = { type: "operator", value: buttonInput };
    }
    try {
      const response = await fetch(`${base_url}/${calcatationId}/tokens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.log("error", error);
    }
  }
  async function getPreviousCal(id) {
    try {
      const response = await fetch(`${base_url}/${id}`);
      const data = await response.json();
      let current_token = [];
      for (let token of data.tokens) {
        current_token.push(token.value);
      }
      let new_tokens = previousCal;
      new_tokens[id] = current_token;
      setPreviousCal(new_tokens);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function getResult() {
    try {
      const response = await fetch(`${base_url}/${calcatationId}/result`);
      const data = await response.json();

      setButtonInput(data.result);
      createCalculation();
      getPreviousCal(calcatationId);
    } catch (error) {
      console.log(error);
    }
  }
  console.log("previousCal", previousCal);

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
      <PreviousCal previous={previousCal} baseUrl={base_url} />
    </div>
  );
};

export default Calculator;
