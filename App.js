import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Header, Button } from 'react-native-elements'

class Cell extends React.Component {
  render() {
    const {isAlive, x, y} = this.props

    return (
      <TouchableOpacity
        onPress={() => this.props.reverseIsAlive(x, y)}
        style={isAlive ? styles.cellAlive : styles.cellDead}
      />
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      xLength: 30,
      yLength: 30,
      board: [],
      isTimerStarted: false,
    }
  }

  componentDidMount() {
    this.initBoard()
    this.startTimer()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  startTimer = () => {
    this.interval = setInterval(this.next, 50)
    this.setState({isTimerStarted: true})
  }
  stopTimer = () => {
    clearInterval(this.interval)
    this.setState({isTimerStarted: false})
  }

  initBoard = () => {
    const {xLength, yLength} = this.state

    let board = []

    for (let x = 0; x <= xLength; x++) {
      for (let y = 0; y >= -yLength; y--) {
        board = [...board, {"x": x, "y": y, "isAlive": false}]
      }
    }

    this.setState({board: board})
  }

  next = () => {
    const {board, xLength, yLength} = this.state

    let nextBoard = []

    for (let x = 0; x <= xLength; x++) {
      for (let y = 0; y >= -yLength; y--) {
        nextBoard = [...nextBoard, {"x": x, "y": y, "isAlive": this.willAlive(board, x, y)}]
      }
    }

    this.setState({board: nextBoard})
  }

  random = () => {
    const {xLength, yLength} = this.state

    let board = []

    for (let x = 0; x <= xLength; x++) {
      for (let y = 0; y >= -yLength; y--) {
        board = [...board, {"x": x, "y": y, "isAlive": this.getRandomBool()}]
      }
    }

    this.setState({board: board})
  }

  getRandomBool = () => this.getRandomInt(2) === 0

  getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

  willAlive = (board, x, y) => {
    const cell = board.find(cell => cell.x === x && cell.y === y)

    if (!cell) return false // new cell

    const aroundCells = this.getAroundCells(board, x, y)

    const aroundCellsCount = aroundCells.filter(cell => cell.isAlive).length

    if (cell.isAlive) return this.willSurvive(aroundCellsCount)

    return this.willBirth(aroundCellsCount)
  }

  willBirth = aroundCellsCount => aroundCellsCount === 3
  willSurvive = aroundCellsCount => aroundCellsCount === 2 || aroundCellsCount === 3

  getAroundCells = (board, x, y) => board.filter(cell => {
      const xDistance = Math.abs(x - cell.x)
      const yDistance = Math.abs(y - cell.y)
      const totalDistance = xDistance + yDistance

      return totalDistance > 0 && totalDistance < 3 && xDistance !== 2 && yDistance !== 2
    }
  )

  reverseIsAlive = (x, y) => {
    const {board} = this.state
    const cell = board.find(cell => cell.x === x && cell.y === y)
    const newBoard = [
      ...board.filter(cell => !(cell.x === x && cell.y === y)),
      {"x": x, "y": y, "isAlive": !cell.isAlive}
    ]
    this.setState({board: newBoard})
  }

  renderBoard = () => {
    const {board} = this.state

    const uniqueYs = [...new Set(board.map(cell => cell.y))].slice().sort((a, b) => b - a)

    return (
      uniqueYs.map(y => {
        const cells = board.filter(cell => cell.y === y).slice().sort((a, b) => b.x - a.x)
        return (
          <View style={{flexDirection: 'row'}} key={y}>
            {cells.map(cell =>
              <Cell
                x={cell.x}
                y={cell.y}
                isAlive={cell.isAlive}
                reverseIsAlive={this.reverseIsAlive}
                key={`${cell.x}, ${cell.y}`}
              />
            )}
          </View>
        )
      })
    )
  }

  render() {
    const {isTimerStarted} = this.state

    return (
      <View style={{flex: 1}}>
        <Header
          centerComponent={{text: 'Life Game', style: {color: '#fff'}}}
        />
        <View style={styles.container}>
          <View>
            {this.renderBoard()}
          </View>
          <View style={styles.buttons}>
            {
              isTimerStarted ? <Button
                  onPress={this.stopTimer}
                  title="Stop"
                  accessibilityLabel="Stop Button"
                /> :
                <Button
                  onPress={this.startTimer}
                  title="Start"
                  accessibilityLabel="Start Button"
                />
            }
            <Button
              raised
              onPress={this.next}
              title="Next"
              accessibilityLabel="Start Button"
            />

            <Button
              onPress={this.random}
              title="Random"
              accessibilityLabel="Random Button"
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellAlive: {
    width: 10,
    height: 10,
    backgroundColor: '#222',
    borderWidth: 0.5,
    borderColor: '#999',
  },
  cellDead: {
    width: 10,
    height: 10,
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: '#999',
  },
})
