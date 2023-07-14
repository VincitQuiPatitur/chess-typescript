import logo from "../../assets/brown_king.png";
import {Colors} from "../Colors";
import {Cell} from "../Cell";

export enum FigureNames {
    FIGURE= "Figure",
    KING="King",
    QUEEN="Queen",
    BISHOP="Bishop",
    KNIGHT="Knight",
    ROOK="Rook",
    PAWN="Pawn"
}

export class Figure {
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;


    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }

    canMove(target: Cell) : boolean {
        // если цвет выбранной фигуры и другой фигуры совпадает
        // не можем походить (нельзя есть свои фигуры)
        if (target.figure?.color === this.color) return false;
        // если фигура - король, тоже нельзя походить
        // (короля есть нельзя)
        if (target.figure?.name === FigureNames.KING) return false;
        return true;
    }

    moveFigure(target: Cell) {
        
    }
}