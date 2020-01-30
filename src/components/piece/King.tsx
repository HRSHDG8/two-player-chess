import * as React from 'react';
import { Piece } from './Piece';
import Color from '../../util/Color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKing } from '@fortawesome/free-solid-svg-icons';
import classNames from './Piece.module.css';
import { resolveTheme } from './Theme.Resolver';
import { Coordinate } from '../../util/Selected';
import { Square } from '../board/BoardUtils';
class King implements Piece {
    color: Color;
    constructor(color: Color) {
        this.color = color;
    }
    attackingMoves(x: number, y: number, board: Square[][]): Coordinate[] {
        const attacks: Coordinate[] = [];
        return attacks;
    }
    possibleMoves(x: number, y: number, board: Square[][]): Coordinate[] {
        const invalidCoordinates: Coordinate[] = [];
        board.forEach((row: Square[], _y: number) => {
            row.forEach((cell: Square, _x: number) => {
                if (cell.piece !== null && cell.piece.color !== this.color && !(cell.piece instanceof King)) {
                    invalidCoordinates.push(...cell.piece.attackingMoves(_x, _y, board));
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
        availableMoves.forEach((valid: Coordinate, index: number) => {
            invalidCoordinates.forEach((invalid: Coordinate) => {
                if (!(invalid.x === valid.x && invalid.y === valid.y)) {
                    coordinates.push({ x: valid.x, y: valid.y });
                }
            })
        });
        return availableMoves
            .map((c: Coordinate) => c.x + "" + c.y)
            .filter(v => !invalidCoordinates
                .map((c: Coordinate) => c.x + "" + c.y).includes(v))
            .map(value => { return { x: parseInt(value[0]), y: parseInt(value[1]) } });
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