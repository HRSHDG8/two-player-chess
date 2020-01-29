import * as React from 'react';
import { Piece } from './Piece';
import Color from '../../util/Color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessBishop } from '@fortawesome/free-solid-svg-icons';
import classNames from './Piece.module.css';
import { resolveTheme } from './Theme.Resolver';
import { Coordinate } from '../../util/Selected';
import { Square } from '../board/Board';
import King from './King';
class Bishop implements Piece {
    color: Color;
    constructor(color: Color) {
        this.color = color;
    }
    attackingMoves(x: number, y: number, board: Square[][]): Coordinate[] {
        const coordinates: Coordinate[] = [];
        //move top-right
        for (let up = y - 1, right = x + 1; up >= 0 && right <= 7; up--, right++) {
            const piece = board[up][right].piece
            if (piece === null) {
                coordinates.push({ x: right, y: up });
            } else {
                //check kill here
                coordinates.push({ x: right, y: up });
                if (piece instanceof King) {
                    coordinates.push({ x: right + 1, y: up - 1 })
                }
                break;
            }
        }
        //move top-left
        for (let up = y - 1, left = x - 1; up >= 0 && left >= 0; up--, left--) {
            const piece = board[up][left].piece
            if (piece === null) {
                coordinates.push({ x: left, y: up });
            } else {
                //check kill here
                coordinates.push({ x: left, y: up });
                if (piece instanceof King) {
                    coordinates.push({ x: left - 1, y: up - 1 })
                }
                break;
            }
        }
        //move bottom-right
        for (let bottom = y + 1, right = x + 1; bottom <= 7 && right <= 7; bottom++, right++) {
            const piece = board[bottom][right].piece
            if (piece === null) {
                coordinates.push({ x: right, y: bottom });
            } else {
                //check kill here
                coordinates.push({ x: right, y: bottom });
                if (piece instanceof King) {
                    coordinates.push({ x: right + 1, y: bottom + 1 })
                }
                break;
            }
        }
        //move bottom-left
        for (let bottom = y + 1, left = x - 1; bottom <= 7 && left >= 0; bottom++, left--) {
            const piece = board[bottom][left].piece
            if (piece === null) {
                coordinates.push({ x: left, y: bottom });
            } else {
                //check kill here
                coordinates.push({ x: left, y: bottom });
                if (piece instanceof King) {
                    coordinates.push({ x: left - 1, y: bottom + 1 })
                }

                break;
            }
        }
        return coordinates.filter(({ x, y }) => x >= 0 && y >= 0 && x <= 7 && y <= 7);
    }
    onClick(x: number, y: number, board: Square[][]): Coordinate[] {
        const coordinates: Coordinate[] = [];
        //move top-right
        for (let up = y - 1, right = x + 1; up >= 0 && right <= 7; up--, right++) {
            if (board[up][right].piece === null) {
                coordinates.push({ x: right, y: up });
            } else {
                //check kill here
                const piece = board[up][right].piece
                if (piece !== null && piece.color !== this.color) {
                    coordinates.push({ x: right, y: up });
                }
                break;
            }
        }
        //move top-left
        for (let up = y - 1, left = x - 1; up >= 0 && left >= 0; up--, left--) {
            if (board[up][left].piece === null) {
                coordinates.push({ x: left, y: up });
            } else {
                //check kill here
                const piece = board[up][left].piece
                if (piece !== null && piece.color !== this.color) {
                    coordinates.push({ x: left, y: up });
                }
                break;
            }
        }
        //move bottom-right
        for (let bottom = y + 1, right = x + 1; bottom <= 7 && right <= 7; bottom++, right++) {
            if (board[bottom][right].piece === null) {
                coordinates.push({ x: right, y: bottom });
            } else {
                //check kill here
                const piece = board[bottom][right].piece
                if (piece !== null && piece.color !== this.color) {
                    coordinates.push({ x: right, y: bottom });
                }
                break;
            }
        }
        //move bottom-left
        for (let bottom = y + 1, left = x - 1; bottom <= 7 && left >= 0; bottom++, left--) {
            if (board[bottom][left].piece === null) {
                coordinates.push({ x: left, y: bottom });
            } else {
                //check kill here
                const piece = board[bottom][left].piece
                if (piece !== null && piece.color !== this.color) {
                    coordinates.push({ x: left, y: bottom });
                }
                break;
            }
        }
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