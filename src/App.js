import React, { Component } from 'react'
import Snake from './Components/Snake';
import Food from './Components/Food'

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

const startingPosition = {
    food: getRandomCoordinates(),
    speed: 200,
    direction: 'RIGHT',
    snakeDots: [
      [0,0],
      [2,0]
    ]
  }

class App extends Component {

  state = startingPosition

componentDidMount() {
  setInterval(this.moveSnake, 200)
  document.onkeydown = this.onKeyDown
}

componentDidUpdate() {
  
  this.checkIfOutOfBounds()
  this.checkIfCollapsed()
  this.checkIfEat()
}

onKeyDown = (e) => {
  e = e || window.event;
  switch (e.keyCode) {
    case 38:
      this.setState({direction: 'UP'})
      break;
    case 40:
      this.setState({direction: 'DOWN'})
      break;
    case 37: 
      this.setState({direction: 'LEFT'});
      break;
    case 39:
      this.setState({direction: 'RIGHT'})
      break;
    }
}

moveSnake = () => {
  let dots = [...this.state.snakeDots];
  let head = dots[dots.length - 1];

  switch (this.state.direction) {
    case 'RIGHT':
      head = [head[0] + 2, head[1]];
      break;
    case 'LEFT':
      head = [head[0] - 2, head[1]];
      break;
    case 'DOWN':
      head = [head[0], head[1] + 2];
      break;
    case 'UP':
      head = [head[0], head[1] -2];
      break;
  }

  dots.push(head);
  dots.shift();
  this.setState({
    snakeDots: dots
  })
}

checkIfOutOfBounds() {
  let head = this.state.snakeDots[this.state.snakeDots.length - 1];
  if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0){
    this.onGameOver();
  }
}

checkIfCollapsed() {
  let snake = [...this.state.snakeDots]
  let head = snake[snake.length - 1]
  snake.pop();
  snake.forEach(dot => {
    if (head[0] == dot[0] && head[1] ==dot[1]) {
      this.onGameOver();
    }
  })
}

checkIfEat() {
  let head = this.state.snakeDots[this.state.snakeDots.length -1];
  let food = this.state.food;

  if (head[0] == food[0] && head[1] == food[1]){
    this.setState({
      food: getRandomCoordinates()
    })
    this.growSnake()
    this.increaseSpeed()
  }
}

growSnake() {
  let newSnake = [...this.state.snakeDots]
  newSnake.unshift([])
  this.setState({
    snakeDots:newSnake
  })
}

increaseSpeed() {
  console.log(this.state.speed)
  if (this.state.speed > 10) {
    this.setState({
      speed: this.state.speed - 10
    })
  }
  setInterval(this.moveSnake, this.state.speed)
}

onGameOver() {
  alert(`Game Over. Your score is ${this.state.snakeDots.length}`)
  this.setState(startingPosition)
}

  render(){
    return (
      <div className="game-area">
        <Snake snakeDots={this.state.snakeDots}/>
        <Food dot={this.state.food}/>

        {/* <div className="snake-dot" style={{top:0, left:0}}></div>
        <div className="snake-dot" style={{top:0, left:'2%'}}></div>
        <div className="snake-dot" style={{top:0, left:'4%'}}></div> */}
      
        </div>
    )
  }
}

export default App;
