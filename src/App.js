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
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={()=> this.props.onClick(i)}/>;
  }
  render() {
    return (
      <div>
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
  constructor(props) {
    super(props);
    this.state = {
      history: [ {
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      currentPlayer: "X"
    }
  }
  
  handleClick(value) {
    let history = this.state.history.slice(0, this.state.stepNumber + 1)
    let current = history[history.length - 1]
    let updatedSquare = [...current.squares];
    if (calculateWinner(updatedSquare) || updatedSquare[value])  return;
    updatedSquare[value] = this.state.currentPlayer;
    let newPlayer = (this.state.currentPlayer === 'X') ? 'O': 'X'

    this.setState({
      history: history.concat([{squares: updatedSquare}]),
      currentPlayer: newPlayer,
      stepNumber: history.length
    })
  }
  
  jumpTo(num) {
    let thePlayer = num  % 2 === 0 ? "X" : "O"
    this.setState({
      stepNumber: num,
      currentPlayer: thePlayer
    })
  } 
  
  render() {
    let history = this.state.history
    let current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)
    let status = winner? `${winner} is the winner!` : `Next player: ${this.state.currentPlayer}`;
    
    let moves = history.map((step, move) => {
      let desc = move ? `Go to move# ${move}` : `Go to game start`
      return (
        <li key={move}>
          <button onClick={()=> this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })
    
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i)=> this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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