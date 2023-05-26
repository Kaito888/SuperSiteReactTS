import {Point, Edge, Polygon, Figure } from '../entities';

export default class Ellipsoid extends Figure {
    a: number;
    b: number;
    c: number;
    count: number;
    points: Point[];
    edges: Edge[];
    polygons: Polygon[];
    
    constructor(count = 10, a = 8, b = 5, c = 3) {
        super();
        this.a = a;
        this.b = b;
        this.c = c;
        this.count = count;

        this.points = [];
        this.edges = [];
        this.polygons = [];

        for (let j = 0; j <= count; j++) {
            const T = Math.PI / count * j;
            for (let i = 0; i < count; i++) {
                const p = 2 * Math.PI / count * i;
                this.points.push(new Point(
                    a * Math.sin(T) * Math.cos(p),
                    b * Math.cos(T),
                    c * Math.sin(T) * Math.sin(p),
                ))
                this.edges.push(new Edge(count * j + i, i === count - 1 ? count * j : count * j + i + 1));
                if (j > 0) {
                    this.edges.push(new Edge(count * j + i, count * (j - 1) + i));
                    this.polygons.push(new Polygon([
                        count * j + i,
                        count * j + (i === count - 1 ? 0 : i + 1),
                        count * (j - 1) + (i === count - 1 ? 0 : i + 1),
                        count * (j - 1) + i,
                    ]))
                }
            }
        }
    }
}