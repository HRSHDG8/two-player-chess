import { Coordinate } from "../../util/Selected";
import { Board } from "../board/BoardUtils";
import King from "./King";
import Color from "../../util/Color";

//return all possible moves even out of bound need to filter on boundary condition post that
export function rookAttackMoves(x: number, y: number, board: Board, coordinates: Coordinate[]) {
    //move up
    for (let up: number = y - 1; up >= 0; up--) {
        const piece = board[up][x].piece
        if (piece === null) {
            coordinates.push({ x: x, y: up });
        } else {
            //check kill here
            coordinates.push({ x: x, y: up });
            if (piece instanceof King) {
                coordinates.push({ x: x, y: up - 1 })
            }
            break;
        }
    }
    //move down
    for (let down: number = y + 1; down <= 7; down++) {
        const piece = board[down][x].piece
        if (piece === null) {
            coordinates.push({ x: x, y: down });
        } else {
            //check kill here
            coordinates.push({ x: x, y: down });

            if (piece instanceof King) {
                coordinates.push({ x: x, y: down + 1 })
            }
            break;
        }
    }
    //move right
    for (let right: number = x + 1; right <= 7; right++) {
        const piece = board[y][right].piece;
        if (piece === null) {
            coordinates.push({ x: right, y: y });
        } else {
            //check kill here
            coordinates.push({ x: right, y: y });
            if (piece instanceof King) {
                coordinates.push({ x: right + 1, y: y })
            }
            break;
        }
    }
    //move left
    for (let left: number = x - 1; left >= 0; left--) {
        const piece = board[y][left].piece
        if (piece === null) {
            coordinates.push({ x: left, y: y });
        } else {
            //check kill here
            coordinates.push({ x: left, y: y });
            if (piece instanceof King) {
                coordinates.push({ x: left - 1, y: y })
            }
            break;
        }
    }
}
export function rookPossibleMoves(x: number, y: number, board: Board, coordinates: Coordinate[], color: Color) {
    //move up
    for (let up: number = y - 1; up >= 0; up--) {
        if (board[up][x].piece === null) {
            coordinates.push({ x: x, y: up });
        } else {
            //check kill here
            const piece = board[up][x].piece
            if (piece !== null && piece.color !== color) {
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
            if (piece !== null && piece.color !== color) {
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
            if (piece !== null && piece.color !== color) {
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
            if (piece !== null && piece.color !== color) {
                coordinates.push({ x: left, y: y });
            }
            break;
        }
    }
}
export function bishopAttackMoves(x: number, y: number, board: Board, coordinates: Coordinate[]) {
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
}
export function bishopPossibleMoves(x: number, y: number, board: Board, coordinates: Coordinate[], color: Color) {
    //move top-right
    for (let up = y - 1, right = x + 1; up >= 0 && right <= 7; up--, right++) {
        if (board[up][right].piece === null) {
            coordinates.push({ x: right, y: up });
        } else {
            //check kill here
            const piece = board[up][right].piece
            if (piece !== null && piece.color !== color) {
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
            if (piece !== null && piece.color !== color) {
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
            if (piece !== null && piece.color !== color) {
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
            if (piece !== null && piece.color !== color) {
                coordinates.push({ x: left, y: bottom });
            }
            break;
        }
    }
} 