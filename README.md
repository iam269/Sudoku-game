# 🎮 Sudoku Game

A simple web-based Sudoku game built with HTML, CSS, and JavaScript. 🧩

## 🌐 Live Demo

Play the game online: [https://itsiamdev.github.io/Sudoku-game/](https://itsiamdev.github.io/Sudoku-game/)

## ✨ Features

- 🔄 Generates random Sudoku puzzles with pre-filled numbers
- 📝 Interactive 9x9 grid for input
- ✅ Input validation (only numbers 1-9 allowed)
- 🔍 Check solution with visual feedback:
  - 🟢 Green: Correct user input
  - 🔴 Red: Incorrect user input
  - ⚪ Gray: Pre-filled numbers
  - ⚫ White: Auto-filled correct numbers for empty cells
- 🎲 New Game: Generate a new puzzle
- 🔄 Reset: Return to initial puzzle state

## 🎯 How to Play

1. 🌐 Open `index.html` in a web browser.
2. 📋 The grid will display a Sudoku puzzle with some numbers already filled.
3. ✏️ Fill in the empty cells with numbers 1-9.
4. 🚫 Ensure no duplicates in rows, columns, or 3x3 boxes.
5. 👀 Click "Check Solution" to see feedback and the complete solution.
6. 🔄 Use "New Game" for a new puzzle or "Reset" to start over.

## 📁 Files

- `index.html`: Main HTML structure 🏗️
- `styles.css`: Styling for the grid and UI 🎨
- `script.js`: Game logic, puzzle generation, and validation 🧠

## 💻 Requirements

- Modern web browser with JavaScript enabled 🌍

## 🧠 Puzzle Generation

The game uses a backtracking algorithm to generate valid Sudoku boards and removes some numbers to create puzzles of medium difficulty. 🤖