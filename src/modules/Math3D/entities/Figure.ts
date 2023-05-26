import { Point, Edge, Polygon } from '.';
import Math3D, { ETransform } from '../Math3D';

export type TAnimation = {
    method: ETransform,
    value: number,
    center: Point
}

export default class Figure {
    points: Point[];
    edges: Edge[];
    polygons: Polygon[];
    center: Point;
    animations: TAnimation[];
    children: number[];

    constructor(points = [], edges = [], polygons = []) {
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.center = new Point();
        this.animations = [];
        this.children = [];
    }

    dropAnimations(): void {
        this.animations = [];
    }

    dropAnimation(num: number): void {
        this.animations[num].value = 0;
    }

    setAnimation(method: ETransform, value: number, center?: Point): void {
        this.animations.push({
            method: method,
            value: value,
            center: center ? center : this.center,
        });
    }

    updateAnimation(num: number, method: ETransform, value: number, center?: Point) {
        this.animations[num] = {
            method: method,
            value: value,
            center: center ? center : this.center,
        };
    }

    doAnimation(math3D: Math3D): void {
        this.animations.forEach(anim => {
            const T2 = math3D[anim.method](anim.value);
            const T1 = math3D.drag(-anim.center.x, -anim.center.y, -anim.center.z);
            const T3 = math3D.drag(anim.center.x, anim.center.y, anim.center.z);
            const matrix = math3D.getTransformMatrix(T1, T2, T3);
            this.points.forEach(point => math3D.transform(matrix, point));
            math3D.transform(matrix, this.center);
        });
    }
}