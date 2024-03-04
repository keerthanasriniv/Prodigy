import React, { useState } from 'react';
import './sudoku.css'; // You can create your CSS file for styling

// Function to solve Sudoku using backtracking
function solveSudoku(grid) {
    const findEmptyCell = (grid) => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    return [row, col];
                }
            }
        }
        return [-1, -1]; // No empty cell found
    };

    const isValid = (grid, num, row, col) => {
        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === num || grid[i][col] === num) {
                return false; // Check row and column
            }
        }
        
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (grid[i][j] === num) {
                    return false; // Check 3x3 grid
                }
            }
        }
        
        return true; // Valid move
    };

    const solve = () => {
        const [row, col] = findEmptyCell(grid);
        if (row === -1 && col === -1) {
            return true; // Puzzle solved
        }
        
        for (let num = 1; num <= 9; num++) {
            if (isValid(grid, num, row, col)) {
                grid[row][col] = num;
                if (solve()) {
                    return true;
                }
                grid[row][col] = 0; // Backtrack
            }
        }
        
        return false; // No solution found
    };

    if (solve()) {
        return grid;
    } else {
        return null; // No solution found
    }
}

function isValidInput(grid) {
    // Validate the input grid
    // Check if it's a valid 9x9 grid with numbers 1 to 9
    // You can implement your validation logic here
    return true; // For simplicity, assuming input is always valid
}

function SudokuSolver() {
    const [inputGrid, setInputGrid] = useState(Array(9).fill(Array(9).fill('')));
    const [solvedGrid, setSolvedGrid] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e, row, col) => {
        const newInputGrid = inputGrid.map((r, i) => {
            if (i === row) {
                return r.map((c, j) => (j === col ? e.target.value : c));
            }
            return r;
        });
        setInputGrid(newInputGrid);
    };

    const handleSolve = () => {
        // Check for valid input
        if (!isValidInput(inputGrid)) {
            setErrorMessage('Wrong input.');
            return;
        }

        // Convert inputGrid to integer values for solving
        const grid = inputGrid.map(row => row.map(val => parseInt(val) || 0));
        const solved = solveSudoku(grid);
        if (solved) {
            setSolvedGrid(solved);
            setErrorMessage('');
        } else {
            setSolvedGrid(null);
            setErrorMessage('Solution not possible.');
        }
    };

    return (
        <div>
        <h1 className='h1s'>SUDOKU SOLVER</h1>
        <div className="sudoku-container">
            <div className="input-section1">
                <h2>Input Sudoku</h2>
                <div className="input-grid">
                    {inputGrid.map((row, rowIndex) => (
                        <div key={rowIndex} className="input-row">
                            {row.map((cell, colIndex) => (
                                <input
                                    key={colIndex}
                                    type="text"
                                    value={cell === 0 ? '' : cell}
                                    onChange={e => handleChange(e, rowIndex, colIndex)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <br/>
                <button onClick={handleSolve} className='sudbutton'>Solve Sudoku</button>
            </div>
            <div className="output-section1">
                <h2>Solved Sudoku</h2>
                <div className="solved-grid">
                    {solvedGrid ? (
                        solvedGrid.map((row, rowIndex) => (
                            <div key={rowIndex} className="solved-row">
                                {row.map((cell, colIndex) => (
                                    <div key={colIndex} className="solved-cell">
                                        {cell}
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : errorMessage ? (
                        <p>{errorMessage}</p>
                    ) : null}
                </div>
            </div>
        </div>
        </div>
    );
}

export default SudokuSolver;
