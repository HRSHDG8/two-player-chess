import Pawn from '../piece/Pawn';
import Rook from '../piece/Rook';
import Knight from '../piece/Knight';
import Bishop from '../piece/Bishop';
import Queen from '../piece/Queen';
import King from '../piece/King';
import Color from "../../util/Color";
import { Piece } from '../piece/Piece';
import { Coordinate } from '../../util/Selected';
export type Board = Square[][];
export const defaultCoordinate: Coordinate = { x: -1, y: -1 };
export const whiteDeadPiece: Piece[] = [];
export const blackDeadPiece: Piece[] = [];
export const initBoard = (): Board => {
    const board: Board = [];
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
export class Square {
    piece: Piece | null = null;
    color: Color;
    highlight: boolean = false;
    constructor(color: Color) {
        this.color = color;
    }
}
const setPieces = (board: Board): void => {
    board[1].forEach((sqaure: Square) => sqaure.piece = new Pawn(Color.white));
    board[0][0].piece = new Rook(Color.white);
    board[0][1].piece = new Knight(Color.white);
    board[0][2].piece = new Bishop(Color.white)
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
export const removeHighlight = (board: Board): void => {
    board.forEach((row: Square[]) => {
        row.forEach((cell: Square) => {
            cell.highlight = false;
        });
    });
}