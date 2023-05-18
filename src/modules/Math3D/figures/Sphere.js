import { Point, Edge, Polygon, Figure } from '../entities';

export default class Sphere extends Figure {
    constructor(count = 10, r = 5) {
        super();
        this.r = r;
        this.count = count;

        this.points = [];
        this.edges = [];
        this.polygons = [];

        for (let j = 0; j <= count; j++) {
            const T = Math.PI / count * j;
            for (let i = 0; i < count; i++) {
                const p = 2 * Math.PI / count * i;
                this.points.push(new Point(
                    r * Math.sin(T) * Math.cos(p),
                    r * Math.cos(T),
                    r * Math.sin(T) * Math.sin(p),
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