import * as React from 'react';
import { Piece } from './Piece';
import Color from '../../util/Color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessPawn } from '@fortawesome/free-solid-svg-icons';
import classNames from './Piece.module.css';
import { resolveTheme } from './Theme.Resolver';
import { Coordinate } from '../../util/Selected';
import { Square } from '../board/BoardUtils';
class Pawn implements Piece {
    color: Color;
    constructor(color: Color) {
        this.color = color;
    }
    attackingMoves(x: number, y: number, board: Square[][]): Coordinate[] {
        const attacks: Coordinate[] = [];
        if (this.color === Color.white) {
            attacks.push({ x: x + 1, y: y + 1 });
            attacks.push({ x: x - 1, y: y + 1 });
        } else {
            attacks.push({ x: x + 1, y: y - 1 });
            attacks.push({ x: x - 1, y: y - 1 });
        }
        return attacks.filter(({ x, y }) => x >= 0 && x <= 7 && y >= 0 && y <= 7);
    }
    possibleMoves(x: number, y: number, board: Square[][]): Coordinate[] {
        const coordinates: Coordinate[] = [];
        if (this.color === Color.white) {
            if (y === 1) {
                if (board[y + 2][x].piece === null && board[y + 1][x].piece === null)
                    coordinates.push({ x: x, y: y + 2 });
            }
            if (y !== 7) {
                if (board[y + 1][x].piece === null)
                    coordinates.push({ x: x, y: y + 1 });
            }
            //kill situtation
            if (!(x + 1 > 7) && (y + 1 <= 7) && board[y + 1][x + 1].piece !== null && board[y + 1][x + 1].piece?.color !== this.color) {
                coordinates.push({ x: x + 1, y: y + 1 })
            }
            if (!(x - 1 < 0) && (y + 1 <= 7) && board[y + 1][x - 1].piece !== null && board[y + 1][x - 1].piece?.color !== this.color) {
                coordinates.push({ x: x - 1, y: y + 1 })
            }

        } else {
            if (y === 6) {
                if (board[y - 2][x].piece === null && board[y - 1][x].piece === null)
                    coordinates.push({ x: x, y: y - 2 });
            }
            if (y !== 0) {
                if (board[y - 1][x].piece === null)
                    coordinates.push({ x: x, y: y - 1 });
            }
            //kill situtation
            if (!(x + 1 > 7) && (y - 1 >= 0) && board[y - 1][x + 1].piece !== null && board[y - 1][x + 1].piece?.color !== this.color) {
                coordinates.push({ x: x + 1, y: y - 1 })
            }
            if (!(x - 1 < 0) && (y - 1 >= 0) && board[y - 1][x - 1].piece !== null && board[y - 1][x - 1].piece?.color !== this.color) {
                coordinates.push({ x: x - 1, y: y - 1 })
            }
        }
        return coordinates;
    }
    render(): JSX.Element {
        return (
            <div className={classNames.chessPieceContainer}>
                <FontAwesomeIcon icon={faChessPawn} className={resolveTheme(this.color).piece} />
            </div>
        )
    }

}
export default Pawn;