import { Point, Edge, Polygon, Figure } from '../entities';

export default class CylinderHyp extends Figure {
    a: number;
    b: number;
    c: number;
    count: number;
    points: Point[];
    edges: Edge[];
    polygons: Polygon[];
    
    constructor(count = 10, a = 3, b = 4, c = 5) {
        super();
        this.a = a;
        this.b = b;
        this.c = c;
        this.count = count;

        this.points = [];
        this.edges = [];
        this.polygons = [];

        for (let k = 0; k < 2; k++) {
            const num = k * count * count;
            for (let j = 0; j < count; j++) {
                for (let i = 0; i < count; i++) {
                    this.points.push(new Point(
                        a * i,
                        b * j,
                        c * Math.sqrt(i * i - 1) * (k === 0 ? 1 : -1),
                    ))
                    this.edges.push(new Edge(count * j + i, i === count - 1 ? count * j : count * j + i + 1));
                    if (j > 0) {
                        this.edges.push(new Edge(count * j + i, count * (j - 1) + i));
                        this.polygons.push(new Polygon([
                            num + count * j + i,
                            num + count * j + (i === count - 1 ? 0 : i + 1),
                            num + count * (j - 1) + (i === count - 1 ? 0 : i + 1),
                            num + count * (j - 1) + i,
                        ]))
                    }
                }
            }
        }
    }
}