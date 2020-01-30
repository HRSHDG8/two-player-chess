import * as React from 'react';
import { Piece } from './Piece';
import Color from '../../util/Color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessQueen } from '@fortawesome/free-solid-svg-icons';
import classNames from './Piece.module.css';
import { resolveTheme } from './Theme.Resolver';
import { Coordinate } from '../../util/Selected';
import { Square } from '../board/BoardUtils';
import { rookAttackMoves, rookPossibleMoves, bishopPossibleMoves, bishopAttackMoves } from './MoveUtils';
class Queen implements Piece {
    color: Color;
    constructor(color: Color) {
        this.color = color;
    }
    attackingMoves(x: number, y: number, board: Square[][]): Coordinate[] {
        const coordinates: Coordinate[] = [];
        rookAttackMoves(x, y, board, coordinates);
        bishopAttackMoves(x, y, board, coordinates);
        return coordinates.filter(({ x, y }) => x >= 0 && y >= 0 && x <= 7 && y <= 7);
    }
    possibleMoves(x: number, y: number, board: Square[][]): Coordinate[] {
        const coordinates: Coordinate[] = [];
        rookPossibleMoves(x, y, board, coordinates, this.color);
        bishopPossibleMoves(x, y, board, coordinates, this.color);
        return coordinates;
    }
    render(): JSX.Element {
        return (
            <div className={classNames.chessPieceContainer}>
                <FontAwesomeIcon icon={faChessQueen} className={resolveTheme(this.color).piece} />
            </div>
        )
    }

}
export default Queen;