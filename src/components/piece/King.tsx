import * as React from 'react';
import { Piece } from './Piece';
import Color from '../../util/Color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKing } from '@fortawesome/free-solid-svg-icons';
import classNames from './Piece.module.css';
import { resolveTheme } from './Theme.Resolver';
import { Coordinate } from '../../util/Selected';
import { Square } from '../board/Board';
class King implements Piece {
    color: Color;
    constructor(color: Color) {
        this.color = color;
    }
    onClick(x: number, y: number, board: Square[][]): Coordinate[] {
        const invalidCoordinates: Coordinate[] = [];
        board.forEach((row: Square[], _y: number) => {
            row.forEach((cell: Square, _x: number) => {
                if (cell.piece !== null && cell.piece.color !== this.color && !(cell.piece instanceof King)) {
                    invalidCoordinates.push(...cell.piece.onClick(_x, _y, board));
                }
            })
        });
        const availableMoves: Coordinate[] = [];
        for (let _x = x - 1; _x <= x + 1; _x++) {
            for (let _y = y - 1; _y <= y + 1; _y++) {
                if (!(_x === x && _y === y) && _x >= 0 && _y >= 0 && _x <= 7 && _y <= 7) {
                    if (board[_y][_x].piece === null || board[_y][_x].piece?.color !== this.color) {
                        availableMoves.push({ x: _x, y: _y });
                    }
                }
            }
        }
        const coordinates: Coordinate[] = [];
        availableMoves.forEach((c: Coordinate, index: number) => {
            invalidCoordinates.forEach((i: Coordinate) => {
                if ((i.x !== c.x || i.y !== c.y)) {
                    coordinates.push({ x: c.x, y: c.y });
                }
            })
        });
        return coordinates;
    }
    render(): JSX.Element {
        return (
            <div className={classNames.chessPieceContainer}>
                <FontAwesomeIcon icon={faChessKing} className={resolveTheme(this.color).piece} />
            </div>
        )
    }

}
export default King;