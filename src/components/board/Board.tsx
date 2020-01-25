import * as React from 'react';
import Color from '../../util/Color';
import dark from './Dark.module.css';
import light from './Light.module.css';
import classNames from './Board.module.css';
import { Piece } from '../piece/Piece';
import Pawn from '../piece/Pawn';
import Rook from '../piece/Rook';
import Knight from '../piece/Knight';
import Bishop from '../piece/Bishop';
import Queen from '../piece/Queen';
import King from '../piece/King';
import { Coordinate } from '../../util/Selected';
export class Square {
    piece: Piece | null = null;
    color: Color;
    highlight: boolean = false;
    constructor(color: Color) {
        this.color = color;
    }

}
const whiteDeadPiece: Piece[] = [];
const blackDeadPiece: Piece[] = [];
const setPieces = (board: Square[][]) => {
    board[1].forEach((sqaure: Square) => sqaure.piece = new Pawn(Color.white));
    board[0][0].piece = new Rook(Color.white);
    board[0][1].piece = new Knight(Color.white);
    board[0][2].piece = new Bishop(Color.white);
    board[0][3].piece = new Queen(Color.white);
    board[0][4].piece = new King(Color.white);
    board[0][5].piece = new Bishop(Color.white);
    board[0][6].piece = new Knight(Color.white);
    board[0][7].piece = new Rook(Color.white);
    board[6].forEach((sqaure: Square) => sqaure.piece = new Pawn(Color.black));
    board[7][0].piece = new Rook(Color.black);
    board[7][1].piece = new Knight(Color.black);
    board[7][2].piece = new Bishop(Color.black);
    board[7][3].piece = new King(Color.black);
    board[7][4].piece = new Queen(Color.black);
    board[7][5].piece = new Bishop(Color.black);
    board[7][6].piece = new Knight(Color.black);
    board[7][7].piece = new Rook(Color.black);
}
const Board: React.FC = () => {
    function initBoard(): Square[][] {
        const board: Square[][] = [];
        for (let y = 0; y < 8; y++) {
            const row: Square[] = [];
            for (let x = 0; x < 8; x++) {
                row.push(new Square((x + y) % 2 === 0 ? Color.white : Color.black));
            }
            board.push(row);
        }
        setPieces(board);
        return board;
    }
    let [board, setBoard] = React.useState(initBoard());
    let [whiteKilled, setWhiteKilled] = React.useState(whiteDeadPiece);
    let [blackKilled, setBlackKilled] = React.useState(blackDeadPiece);
    let [turn, setTurn] = React.useState(Color.white);
    let [selectedPiece, setSelectedPiece] = React.useState({ x: -1, y: -1 });
    function resolveTheme(color: Color) {
        return color === Color.black ? dark : light;
    }
    function handleSquareClick(square: Square, x: number, y: number) {
        if (square.piece) {
            if (square.piece.color === turn) {
                const coordinates: Coordinate[] = square.piece.onClick(x, y, board);
                board.forEach((row: Square[], _y: number) => {
                    row.forEach((cell: Square, _x: number) => {
                        cell.highlight = false;
                    })
                });
                coordinates.forEach((coordinate: Coordinate) => {
                    board[coordinate.y][coordinate.x].highlight = true;
                });
                setBoard([...board]);
                setSelectedPiece({ ...{ x: x, y: y } });
            } else {
                if (selectedPiece.x !== -1 && square.highlight) {
                    board.forEach((row: Square[], _y: number) => {
                        row.forEach((cell: Square, _x: number) => {
                            cell.highlight = false;
                        })
                    });
                    const deadPiece = board[y][x].piece;
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
                    board[y][x].piece = board[selectedPiece.y][selectedPiece.x].piece;
                    board[selectedPiece.y][selectedPiece.x].piece = null;
                    setSelectedPiece({ x: -1, y: -1 });
                    setBoard([...board]);

                    setTurn(turn === Color.white ? Color.black : Color.white);
                }
            }
        } else if (square.highlight) {
            board.forEach((row: Square[], _y: number) => {
                row.forEach((cell: Square, _x: number) => {
                    cell.highlight = false;
                })
            });
            board[y][x].piece = board[selectedPiece.y][selectedPiece.x].piece;
            board[selectedPiece.y][selectedPiece.x].piece = null;
            setSelectedPiece({ x: -1, y: -1 });
            setBoard([...board]);
            setTurn(turn === Color.white ? Color.black : Color.white);
        }
    }
    return (
        <>
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
        </>
    );
}

export default Board;
