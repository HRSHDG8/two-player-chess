import * as React from 'react';
import { Piece } from './Piece';
import Color from '../../util/Color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessBishop } from '@fortawesome/free-solid-svg-icons';
import classNames from './Piece.module.css';
import { resolveTheme } from './Theme.Resolver';
import { Coordinate } from '../../util/Selected';
import { Square } from '../board/BoardUtils';
import { bishopAttackMoves, bishopPossibleMoves } from './MoveUtils';
class Bishop implements Piece {
    color: Color;
    constructor(color: Color) {
        this.color = color;
    }
    attackingMoves(x: number, y: number, board: Square[][]): Coordinate[] {
        const coordinates: Coordinate[] = [];
        bishopAttackMoves(x, y, board, coordinates);
        return coordinates.filter(({ x, y }) => x >= 0 && y >= 0 && x <= 7 && y <= 7);
    }
    possibleMoves(x: number, y: number, board: Square[][]): Coordinate[] {
        const coordinates: Coordinate[] = [];
        bishopPossibleMoves(x, y, board, coordinates, this.color);
        return coordinates;
    }
    render(): JSX.Element {
        return (
            <div className={classNames.chessPieceContainer}>
                <FontAwesomeIcon icon={faChessBishop} className={resolveTheme(this.color).piece} />
            </div>
        )
    }

}
export default Bishop;