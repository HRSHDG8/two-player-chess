import * as React from 'react';
import { Piece } from './Piece';
import Color from '../../util/Color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessRook } from '@fortawesome/free-solid-svg-icons';
import classNames from './Piece.module.css';
import { resolveTheme } from './Theme.Resolver';
import { Coordinate } from '../../util/Selected';
import { Square } from '../board/Board';
class Rook implements Piece {
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
        //move up
        for (let up: number = y - 1; up >= 0; up--) {
            if (board[up][x].piece === null) {
                coordinates.push({ x: x, y: up });
            } else {
                //check kill here
                const piece = board[up][x].piece
                if (piece !== null && piece.color !== this.color) {
                    coordinates.push({ x: x, y: up });
                }
                break;
            }
        }
        //move down
        for (let down: number = y + 1; down <= 7; down++) {
            if (board[down][x].piece === null) {
                coordinates.push({ x: x, y: down });
            } else {
                //check kill here
                const piece = board[down][x].piece
                if (piece !== null && piece.color !== this.color) {
                    coordinates.push({ x: x, y: down });
                }
                break;
            }
        }
        //move right
        for (let right: number = x + 1; right <= 7; right++) {
            if (board[y][right].piece === null) {
                coordinates.push({ x: right, y: y });
            } else {
                //check kill here
                const piece = board[y][right].piece
                if (piece !== null && piece.color !== this.color) {
                    coordinates.push({ x: right, y: y });
                }
                break;
            }
        }
        //move left
        for (let left: number = x - 1; left >= 0; left--) {
            if (board[y][left].piece === null) {
                coordinates.push({ x: left, y: y });
            } else {
                //check kill here
                const piece = board[y][left].piece
                if (piece !== null && piece.color !== this.color) {
                    coordinates.push({ x: left, y: y });
                }
                break;
            }
        }
        return coordinates;
    }
    render(): JSX.Element {
        return (
            <div className={classNames.chessPieceContainer}>
                <FontAwesomeIcon icon={faChessRook} className={resolveTheme(this.color).piece} />
            </div>
        )
    }

}
export default Rook;