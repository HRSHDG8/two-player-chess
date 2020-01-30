import * as React from 'react';
import Color from '../../util/Color';
import classNames from './Board.module.css';
import { Piece } from '../piece/Piece';
import King from '../piece/King';
import { Coordinate } from '../../util/Selected';
import { Square, resolveTheme, whiteDeadPiece, blackDeadPiece, initBoard, defaultCoordinate } from './BoardUtils';

const Board: React.FC = () => {
    let [board, setBoard] = React.useState(initBoard());
    let [whiteKilled, setWhiteKilled] = React.useState(whiteDeadPiece);
    let [blackKilled, setBlackKilled] = React.useState(blackDeadPiece);
    let [turn, setTurn] = React.useState(Color.white);
    let [selectedPiece, setSelectedPiece] = React.useState(defaultCoordinate);
    let [gameOver, setGameOver] = React.useState(false);

    function showPossibleMoves(piece: Piece, x: number, y: number) {
        let kingPos: Coordinate = { x: -1, y: -1 };
        board.forEach((row: Square[], _y: number) => {
            row.forEach((cell: Square, _x: number) => {
                cell.highlight = false;
                if (cell.piece?.color === turn && cell.piece instanceof King) {
                    kingPos = { x: _x, y: _y };
                }
            });
        });
        console.log("The king is at : ", kingPos);
        const coordinates: Coordinate[] = piece.possibleMoves(x, y, board);
        coordinates.forEach((coordinate: Coordinate) => {
            board[coordinate.y][coordinate.x].highlight = true;
        });
        setBoard([...board]);
        setSelectedPiece({ ...{ x: x, y: y } });
    }
    function killMove(x: number, y: number) {
        const deadPiece = board[y][x].piece;
        setGameOver(deadPiece instanceof King);
        if (turn === Color.white) {
            const blackDead = blackKilled;
            if (deadPiece !== null) {
                blackDead.push(deadPiece);
            }
            setBlackKilled([...blackDead]);
        } else {
            const whiteDead = whiteKilled;
            if (deadPiece !== null) {
                whiteDead.push(deadPiece);
            }
            setWhiteKilled([...whiteDead]);
        }
        movePiece(x, y);
    }
    function movePiece(x: number, y: number) {
        board.forEach((row: Square[], _y: number) => {
            row.forEach((cell: Square, _x: number) => {
                cell.highlight = false;
            })
        });
        board[y][x].piece = board[selectedPiece.y][selectedPiece.x].piece;
        board[selectedPiece.y][selectedPiece.x].piece = null;
        setSelectedPiece(defaultCoordinate);
        setBoard([...board]);
        setTurn(turn === Color.white ? Color.black : Color.white);
    }
    function handleSquareClick(square: Square, x: number, y: number) {
        if (!gameOver) {
            if (square.piece) {
                if (square.piece.color === turn) {
                    showPossibleMoves(square.piece, x, y);
                } else {
                    if (selectedPiece.x !== -1 && square.highlight) {
                        killMove(x, y);
                    }
                }
            } else if (square.highlight) {
                movePiece(x, y);
            }
        }
    }
    return (
        <>
            <div style={{ width: '500px', display: "inline-block", verticalAlign: 'top' }}>
                <table className={classNames.board}>
                    <tbody>
                        {
                            board.map((row: Square[], y: number) => {
                                return (
                                    <tr key={y}>
                                        {
                                            row.map((square: Square, x: number) => {
                                                return <td key={x} className={classNames.cell}>
                                                    <div className={classNames.square + " " + resolveTheme(square.color).squareColor + " " + (square.highlight ? classNames.highlight : '') + " " + (selectedPiece.x === x && selectedPiece.y === y ? classNames.currentSelection : "")} onClick={() => { handleSquareClick(square, x, y) }}>
                                                        {square.piece ? square.piece.render() : null}
                                                    </div>
                                                </td>
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div style={{ display: "inline-block" }}>
                <div>
                    {gameOver ?
                        <>
                            <h1>Game Over</h1>
                            <h2>Winner : {turn !== Color.white ? "White" : "Black"}</h2>
                        </>
                        :
                        <div>
                            Current Player : {turn === Color.white ? "White" : "Black"}
                        </div>}
                </div>

                <table>
                    <tbody>
                        <tr>
                            {blackKilled.map((dead: Piece, index: number) => {
                                return <td key={index}>
                                    {dead.render()}
                                </td>
                            })}
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            {whiteKilled.map((dead: Piece, index: number) => {
                                return <td key={index}>
                                    {dead.render()}
                                </td>
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Board;
