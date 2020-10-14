import React, { useState } from "react";

const PreviousCal = ({ previous, baseUrl }) => {
  const [tokens, setTokens] = useState([]);

  return (
    <div>
      <h2>Previous Calculations</h2>
      <table border="1" width="100%">
        <tbody>
          <tr>
            <td>Calculation Id</td>
            <td>Tokens</td>
          </tr>
          {Object.entries(previous).map((prev) => {
            return (
              <tr key={prev}>
                <td>{prev[0]}</td>
                <td>{prev[1]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PreviousCal;
