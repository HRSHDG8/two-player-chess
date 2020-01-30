import Color from "../../util/Color";
import { Coordinate } from "../../util/Selected";
import { Square } from '../board/BoardUtils';
export interface Piece {
    color: Color;
    possibleMoves: (x: number, y: number, board: Square[][]) => Coordinate[];
    attackingMoves: (x: number, y: number, board: Square[][]) => Coordinate[];
    render: Function;
}