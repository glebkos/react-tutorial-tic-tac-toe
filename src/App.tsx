import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {players, squaresArray} from './App.types.ts';

Square.propTypes = {
  value: PropTypes.string,
  onSquareClick: PropTypes.func,
}
function Square(props): JSX.Element{
  const {value, onSquareClick} = props;
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

Board.propTypes = {
  xIsNext: PropTypes.bool,
  squares: PropTypes.array,
  onPlay: PropTypes.func,
}

function Board(props): JSX.Element {
  const {xIsNext, squares, onPlay} = props;

  function handleClick(i): void {
    if (squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares: squaresArray = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner: players = calculateWinner(squares);
  const status: string = winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O');


  return (<>
    <div className="status">{status}</div>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
  </>);
}

export default function Game(): JSX.Element {
  const [currentMove, setCurrentMove] = useState<number>(0);
  const xIsNext: boolean = currentMove% 2 === 0;
  const [history, setHistory] = useState<squaresArray[]>([Array(9).fill(null)]);
  const currentSquares: squaresArray = history[currentMove];

  function handlePlay(nextSquares: squaresArray){
    const nextHistory: squaresArray[] = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove): void{
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const description = move > 0? 'Go to move #' + move : 'Go to game start';

    return (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>{description}</button>
    </li>)
  });

  return (
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
  )
}

function calculateWinner(squares: squaresArray): players | null{
  const lines=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines){
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}
