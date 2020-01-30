import Color from "../../util/Color";
import { Coordinate } from "../../util/Selected";
import { Board } from '../board/BoardUtils';
export interface Piece {
    color: Color;
    possibleMoves: (x: number, y: number, board: Board) => Coordinate[];
    attackingMoves: (x: number, y: number, board: Board) => Coordinate[];
    render: Function;
}