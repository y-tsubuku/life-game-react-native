import React from 'react';
import App from './App';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});

describe('App', () => {

  describe('getAroundCells', () => {
    let app
    let board

    beforeAll(() => {
      app = new App()
      board = board = [
        {"x": 0, "y": 0, "isAlive": true},
        {"x": 1, "y": 0, "isAlive": true},
        {"x": 2, "y": 0, "isAlive": true},
        {"x": 3, "y": 0, "isAlive": true},

        {"x": 0, "y": -1, "isAlive": true},
        {"x": 1, "y": -1, "isAlive": true},
        {"x": 2, "y": -1, "isAlive": true},
        {"x": 3, "y": -1, "isAlive": true},

        {"x": 0, "y": -2, "isAlive": true},
        {"x": 1, "y": -2, "isAlive": true},
        {"x": 2, "y": -2, "isAlive": true},
        {"x": 3, "y": -2, "isAlive": true},

        {"x": 0, "y": -3, "isAlive": true},
        {"x": 1, "y": -3, "isAlive": true},
        {"x": 2, "y": -3, "isAlive": true},
        {"x": 3, "y": -3, "isAlive": true},
      ]

    })

    it('should filter 3 cells', () => {
      const actual = app.getAroundCells(board, 0, 0)

      const expected = [
        {"x": 1, "y": 0, "isAlive": true},
        {"x": 0, "y": -1, "isAlive": true},
        {"x": 1, "y": -1, "isAlive": true},
      ]

      expect(actual).toEqual(expected)
    })

    it('should filter 5 cells', () => {
      const actual = app.getAroundCells(board, 1, 0)

      const expected = [
        {"x": 0, "y": 0, "isAlive": true},
        {"x": 2, "y": 0, "isAlive": true},
        {"x": 0, "y": -1, "isAlive": true},
        {"x": 1, "y": -1, "isAlive": true},
        {"x": 2, "y": -1, "isAlive": true},
      ]

      expect(actual).toEqual(expected)
    })

    it('should filter 8 cells', () => {
      const actual = app.getAroundCells(board, 1, -1)

      const expected = [
        {"x": 0, "y": 0, "isAlive": true},
        {"x": 1, "y": 0, "isAlive": true},
        {"x": 2, "y": 0, "isAlive": true},
        {"x": 0, "y": -1, "isAlive": true},
        {"x": 2, "y": -1, "isAlive": true},
        {"x": 0, "y": -2, "isAlive": true},
        {"x": 1, "y": -2, "isAlive": true},
        {"x": 2, "y": -2, "isAlive": true},
      ]

      expect(actual).toEqual(expected)
    })
  })
})
