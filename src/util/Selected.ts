import { Piece } from "../components/piece/Piece";

export interface Selected {
    piece: Piece;
    cordinate: Coordinate;
}
export interface Coordinate {
    x: number;
    y: number;
}