import * as React from 'react';
import { Piece } from './Piece';
import Color from '../../util/Color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKnight } from '@fortawesome/free-solid-svg-icons';
import classNames from './Piece.module.css';
import { resolveTheme } from './Theme.Resolver';
import { Coordinate } from '../../util/Selected';
import { Square } from '../board/Board';
class Knight implements Piece {
    color: Color;
    constructor(color: Color) {
        this.color = color;
    }
    attackingMoves(x: number, y: number, board: Square[][]): Coordinate[] {
        const attacks: Coordinate[] = this.onClick(x, y, board);
        return attacks;
    }
    onClick(x: number, y: number, board: Square[][]): Coordinate[] {
        const coordinates: Coordinate[] = [];
        //move top-right
        coordinates.push({ x: x + 1, y: y - 2 });
        coordinates.push({ x: x + 2, y: y - 1 });
        //move top-left
        coordinates.push({ x: x - 1, y: y - 2 });
        coordinates.push({ x: x - 2, y: y - 1 });
        //move bottom-right
        coordinates.push({ x: x + 1, y: y + 2 });
        coordinates.push({ x: x + 2, y: y + 1 });
        //move bottom-left
        coordinates.push({ x: x - 1, y: y + 2 });
        coordinates.push({ x: x - 2, y: y + 1 });
        return coordinates.filter(({ x, y }: Coordinate) => {
            if (y >= 0 && y <= 7 && x >= 0 && x <= 7) {
                const piece: Piece | null = board[y][x].piece;
                if (piece === null || piece?.color !== this.color) {
                    coordinates.push({ x: x, y: y });
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        });
    }
    render(): JSX.Element {
        return (
            <div className={classNames.chessPieceContainer}>
                <FontAwesomeIcon icon={faChessKnight} className={resolveTheme(this.color).piece} />
            </div>
        )
    }

}
export default Knight;