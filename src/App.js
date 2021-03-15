import React, { Component } from 'react'
import Snake from './components/Snake';
import Food from './components/Food'
// import ebbieHead from "./images/ebbieHead.png"

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
      [2,0],
    ],
}

// 1) CREATE TWO BUTTONS
  // Start Button: starts the game
  // Pause Button: pauses game
// 2) START BUTTON
  //  3) Make the start button initialize direction and speed
  //  4) Make start button activate eating self penalty
// 5) PAUSE BUTTON
  //  5) Stops snake direction and speed
  //  6) Stops all penalties
  //  7) Greys out screen

let snakeInterval;

class App extends Component {

  state = {
    food: getRandomCoordinates(),
    speed: 200,
    direction: 'RIGHT',
    snakeDots: [
      [0,0],
      [2,0],
    ],
    startButton: "Start"
  }

  componentDidMount() {
    clearInterval(this.intervalId)
    setInterval(this.pauseSnake, 200)
    document.onkeydown = this.onKeyDown
  }

  componentDidUpdate() {
    this.checkIfOutOfBounds()
    this.checkIfCollapsed()
    this.checkIfEat()
  }

  startGame = event => {
    console.log("read")
    snakeInterval = setInterval(this.moveSnake, 200)
    document.onkeydown = this.onKeyDown
  }

  // startGame = event => {

  //   if (this.state.startButton = "Start") {
  //     snakeInterval = setInterval(this.moveSnake, 200)
  //     document.onkeydown = this.onKeyDown
  //     this.setState({startButton: "Pause"})
  //     console.log(this.state.start)
  //   } else if (this.state.startButton = "Pause"){
  //     console.log("read")
  //     clearInterval(snakeInterval)
  //     this.setState({startButton: "Start"})
  //   }
  // }

  pauseGame() {
    clearInterval(snakeInterval)
    // this.state.startButton = "Start"
  }

  pauseSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

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

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'})
        // this.ebbieHeadDirection()
        break;
      case 40:
        this.setState({direction: 'DOWN'})
        // this.ebbieHeadDirection()
        break;
      case 37: 
        this.setState({direction: 'LEFT'});
        // this.ebbieHeadDirection()
        break;
      case 39:
        this.setState({direction: 'RIGHT'})
        // this.ebbieHeadDirection()
        break;
      }
}
    // ebbieHeadDirection = () => {
    //   const ebbieHead = this.state.snakeDots[this.state.snakeDots.length -1]
    //   console.log(ebbieHead)

    // }

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

    let snakeArray = this.state.snakeDots

    // console.log(snakeArray[snakeArray.length - 1])

  }

  increaseSpeed() {
    console.log(this.state.speed)
    let speed = this.state.speed

    if (this.state.speed > 10) {
      speed -= 10;
      this.setState({
        speed
      })
    }

    clearInterval(this.intervalId)
    this.intervalId = setInterval(this.moveSnake, this.state.speed)
    console.log(this.intervalId)

  }

  onGameOver() {
    alert(`Game Over. Your score is ${(this.state.snakeDots.length - 2)}`)

    // document.getElementById("gameOverSlide").style.display = 'flex'

    this.setState(startingPosition)
    clearInterval(snakeInterval) 
  }

  render(){
    return (
      <>
        <div className="gameOverSlide">
        </div>
        <div className="headSection">
          <div className="mainSnakeHeadline">Snake</div>
        
          <div className="mainSubhead">Eat the Apples</div>
        </div>
        <main id="gameArea">
          <Snake snakeDots={this.state.snakeDots}/>
          <Food dot={this.state.food}/>
        
        </main>
        <div className="scoreSection">
          <div className="foodScoreSymbol"/>
          <div className="scoreCopy">Score:</div>
          <div className="scoreAmount">{(this.state.snakeDots.length -2)}</div>
        </div>
        <div className="buttonSection">
            <button 
              className="bothStartPauseButtons" 
              id="startButton"
              onClick={this.startGame}
            >
              {this.state.startButton}
            </button>
            <button 
              className="bothStartPauseButtons" 
              id="pauseButton"
              onClick={this.pauseGame}
            >
              Pause
            </button>
        </div>
      </>
    )
  }
}

export default App;
