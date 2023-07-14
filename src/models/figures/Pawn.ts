import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/brown_pawn.png";
import whiteLogo from "../../assets/white_pawn.png";

export class Pawn extends Figure {
    isFirstStep: boolean = true;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.PAWN;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target))
            return false;
        // пешки сверху доски (черные) могут ходить только вниз,
        // а пешки снизу доски (белые) могут ходить только вверх
        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
        const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2;

        // проверяем смещение на 1 или на 2, если это первый шаг
        // и смещение идет по одной вертикальной линии
        // и ячейка, на которую хотим перейти - пустая
        if ((target.y === this.cell.y + direction ||
                this.isFirstStep && (target.y === this.cell.y + firstStepDirection))
            && target.x === this.cell.x
            && this.cell.board.getCell(target.x, target.y).isEmpty()) {
            return true;
        }

        //  кушаем фигуру по диагонали
        if (target.y === this.cell.y + direction
        && (target.x === this.cell.x + 1 || target.x === this.cell.x-1)
        && this.cell.isEnemy(target)) {
            return true;
        }
        return false;
    }

    moveFigure(target: Cell) {
        super.moveFigure(target);
        this.isFirstStep = false;
    }
}