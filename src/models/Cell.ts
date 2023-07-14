import {Colors} from "./Colors";
import {Figure} from "./figures/Figure";
import {Board} from "./Board";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: boolean; // можно ли сделать ход на текущую ячейку
    id: number; // для реакт ключей

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        this.id = Math.random();
    }

    isEmpty(): boolean {
        return this.figure === null;
    }

    isEnemy(target: Cell): boolean {
        if (target.figure) {
            return this.figure?.color !== target.figure.color;
        }
        return false;
    }

    isEmptyVertical(target: Cell): boolean {
        // если х координата текущей ячейки и координата таргет ячейки
        // не совпадают, то возвращаем false
        if (this.x !== target.x) {
            return false
        }

        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);

        for (let y = min + 1; y < max; y++) {
            // если ячейка не пустая, то и диагональ не пустая, тогда возвращаем false
            if (!this.board.getCell(this.x, y).isEmpty()) return false;
        }
        return true;
    }

    isEmptyHorizontal(target: Cell): boolean {
        if (this.y !== target.y) {
            return false
        }

        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);

        for (let x = min + 1; x < max; x++) {
            // если ячейка не пустая, то и диагональ не пустая, тогда возвращаем false
            if (!this.board.getCell(x, this.y).isEmpty()) return false;
        }
        return true;
    }

    isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);

        // разница между координатами должна совпадать, тогда это диагональ
        if (absY !== absX)
            return false;

        // получаем направление, по которому фигура хочет двигаться
        // если координата по у текущей проверки
        // меньше чем координата точки, в которую хотим попасть
        // то присваиваем 1 иначе -1
        const dy = this.y < target.y ? 1 : -1;
        const dx = this.x < target.x ? 1 : -1;

        for (let i = 1; i < absY; i++) {
            if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty())
                return false;
        }
        return true;
    }

    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    addLostFigure(figure: Figure) {
        figure.color === Colors.BLACK
            ? this.board.lostBlackFigures.push(figure)
            : this.board.lostWhiteFigures.push(figure)
    }

    moveFigure(target: Cell) {
        // если есть фигура на этой ячейке и её можно двигать
        // то её можно передвинуть
        if (this.figure && this.figure?.canMove(target)) {
            this.figure.moveFigure(target);

            // добавляем в массив съеденную фигуру
            if (target.figure) {
                this.addLostFigure(target.figure);
            }
            // добавляем фигуру в новую ячейку
            target.setFigure(this.figure);
            // удаляем фигуру со старой чейки
            this.figure = null;
        }
    }
}