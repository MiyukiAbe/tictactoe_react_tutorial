import React from 'react';
import logo from './logo.svg';
import './App.css';

function Square (props) {
    return (
      <button className="square" 
      onClick= {props.onClick}
      >
        {props.value}
      </button>
    );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      currentPlayer: "X"
    }
  }
  
  handleClick(value) {
    let updatedSquare = [...this.state.squares];
    if (calculateWinner(updatedSquare) || updatedSquare[value])  return;
    updatedSquare[value] = this.state.currentPlayer
    let newPlayer = (this.state.currentPlayer === 'X') ? 'O': 'X'

    this.setState({
      squares: updatedSquare,
      currentPlayer: newPlayer
    })
  }
  
  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={()=> this.handleClick(i)}/>;
  }

  render() {
    const winner = calculateWinner(this.state.squares)
    let status = winner? `${winner} is the winner!` : `Next player: ${this.state.currentPlayer}`;
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


function calculateWinner(squares) {
  let winnerLines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  
  for(let i = 0; i < winnerLines.length; i++) {
    let [a,b,c] = winnerLines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a]
  }
  return null
}