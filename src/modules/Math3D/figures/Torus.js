import {Point, Edge, Polygon, Figure } from '../entities';

export default class Torus extends Figure {
    constructor(count = 20, a = 5, b = 7, r = 2) {
        super();
        this.a = a;
        this.b = b;
        this.r = r;
        this.count = count;

        this.points = [];
        this.edges = [];
        this.polygons = [];

        for (let j = 0; j <= count; j++) {
            const T = 2 * Math.PI * Math.PI / count * j / 3;
            for (let i = 0; i < count; i++) {
                const p = 2 * Math.PI * Math.PI / count * i / 3;
                this.points.push(new Point(
                    (a + r * Math.cos(T)) * Math.cos(p),
                    r * Math.sin(T),
                    (b + r * Math.cos(T)) * Math.sin(p),
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