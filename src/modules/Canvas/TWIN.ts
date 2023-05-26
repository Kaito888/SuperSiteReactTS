import { Point } from "../Math3D";

export type TWIN_2D = {
    LEFT: number,
    BOTTOM: number,
    WIDTH: number,
    HEIGHT: number
};

export type TWIN_3D = TWIN_2D & {
    FOCUS: Point,
    CAMERA: Point
}