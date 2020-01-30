import React, {useState} from 'react';
import './index.css'

function App() {
  return (
    <Game />
  );
}

export default App;

function Square(props) {
  return (
    <button 
      className="square" 
      onClick={() => { props.onClick() }}
    >
      {props.value}
    </button>
  )
}

function Board(props) {

  function renderSquare(i, props) {
    return <Square 
      value={props.squares[i]} 
      onClick={() => props.onClick(i)}
    />
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0, props)}
        {renderSquare(1, props)}
        {renderSquare(2, props)}
      </div>
      <div className="board-row">
        {renderSquare(3, props)}
        {renderSquare(4, props)}
        {renderSquare(5, props)}
      </div>
      <div className="board-row">
        {renderSquare(6, props)}
        {renderSquare(7, props)}
        {renderSquare(8, props)}
      </div>
    </div>
  )
}

function Game() {
  const [history, setHistory] = useState([{squares: Array(9).fill(null)}])
  const [xIsNext, setXIsNext] = useState(true)
  const [stepNumber, setStepNumber] = useState(0)

  function handleClick(i, history, setHistory, xIsNext, setXIsNext, stepNumber, setSetNumber, calculateWinner) {
    const newHistory = history.slice(0, stepNumber + 1)
    const current = newHistory[newHistory.length - 1]
    const squares = current.squares.slice()
    if(calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = xIsNext ? 'X' : 'O'
    setHistory(newHistory.concat([{squares}]))
    setStepNumber(newHistory.length)
    setXIsNext(!xIsNext)
  }

  function jumpTo(step, setStepNumber, setXIsNext) {
    setStepNumber(step)
    setXIsNext((step % 2) === 0)
  }

  const current = history[stepNumber]
  const winner = calculateWinner(current.squares)

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start'
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move, setStepNumber, setXIsNext)}>{desc}</button>
      </li>
    )
  })

  function status(winner, xIsNext) {
    return winner ? 'Winner ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={current.squares}
          onClick={(i) => handleClick(i, history, setHistory, xIsNext, setXIsNext, stepNumber, setStepNumber, calculateWinner)}
        />
      </div>
      <div className="game-info">
        <div>{status(winner, xIsNext)}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  
  return null
}
