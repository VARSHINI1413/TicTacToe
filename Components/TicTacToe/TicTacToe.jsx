import React, { useState } from 'react';
import './TicTacToe.css'; // Make sure your CSS file is correctly linked
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
  const [count, setCount] = useState(0); // Track the number of moves
  const [lock, setLock] = useState(false); // Lock the game when a winner is found
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]); // Board state
  const [winner, setWinner] = useState(null); // Track the winner message

  // Handle cell click
  const toggle = (num) => {
    if (lock || data[num] !== "") {
      return; // Prevent clicking on a filled cell or after the game is over
    }

    const newData = [...data];
    if (count % 2 === 0) {
      newData[num] = "x"; // X's turn
    } else {
      newData[num] = "o"; // O's turn
    }

    setData(newData); // Update the board state
    setCount(count + 1); // Increment the move count
    checkWin(newData); // Check if there's a winner after the move
  };

  // Check for win condition
  const checkWin = (newData) => {
    const winConditions = [
      [0, 1, 2], // Row 1
      [3, 4, 5], // Row 2
      [6, 7, 8], // Row 3
      [0, 3, 6], // Column 1
      [1, 4, 7], // Column 2
      [2, 5, 8], // Column 3
      [0, 4, 8], // Diagonal 1
      [2, 4, 6], // Diagonal 2
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (newData[a] !== "" && newData[a] === newData[b] && newData[b] === newData[c]) {
        setLock(true); // Lock the game if there's a winner
        setWinner(`${newData[a].toUpperCase()} wins!`); // Set the winner message
        return;
      }
    }

    // Check for draw (if board is full and no winner)
    if (!newData.includes("") && !lock) {
      setWinner("It's a draw!"); // Set the draw message
    }
  };

  // Reset the game state
  const resetGame = () => {
    setData(["", "", "", "", "", "", "", "", ""]); // Clear the board
    setCount(0); // Reset move count
    setLock(false); // Unlock the game
    setWinner(null); // Clear the winner message
  };

  // Render the board cells
  const renderBox = (index) => {
    return (
      <div className="boxes" onClick={() => toggle(index)}>
        {data[index] === "x" ? <img src={cross_icon} alt="cross" /> : data[index] === "o" ? <img src={circle_icon} alt="circle" /> : null}
      </div>
    );
  };

  return (
    <div className='container'>
      <h1 className="title">Tic Tac Toe Game in <span>React</span></h1>

      <div className="board">
        <div className="row1">
          {renderBox(0)}
          {renderBox(1)}
          {renderBox(2)}
        </div>
        <div className="row2">
          {renderBox(3)}
          {renderBox(4)}
          {renderBox(5)}
        </div>
        <div className="row3">
          {renderBox(6)}
          {renderBox(7)}
          {renderBox(8)}
        </div>
      </div>

      {/* Display the winner or draw message */}
      {winner && <div className="message">{winner}</div>}

      <button onClick={resetGame}>
        <div className="reset">RESET</div>
      </button>
    </div>
  );
};

export default TicTacToe;

