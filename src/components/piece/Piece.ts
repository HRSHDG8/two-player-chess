import Color from "../../util/Color";
import { Coordinate } from "../../util/Selected";
import { Square } from '../board/Board';
export interface Piece {
    color: Color;
    onClick: (x: number, y: number, board: Square[][]) => Coordinate[];
    render: Function
}