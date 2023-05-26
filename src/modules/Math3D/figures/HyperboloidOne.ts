import { Point, Edge, Polygon, Figure } from '../entities';

export default class Hyperboloid1 extends Figure {
    a: number;
    b: number;
    c: number;
    count: number;
    points: Point[];
    edges: Edge[];
    polygons: Polygon[];

    constructor(count = 10, a = 1.1, b = 1, c = 1.5) {
        super();
        this.a = a;
        this.b = b;
        this.c = c;
        this.count = count;

        this.points = [];
        this.edges = [];
        this.polygons = [];

        for (let j = 0; j < count / 2; j++) {
            const T = Math.PI / count * (j + 1);
            for (let i = 0; i < count; i++) {
                const p = 2 * Math.PI / count * i;
                const aa = a * Math.sqrt(1 + j * j);
                const cc = c * Math.sqrt(1 + j * j);
                this.points.push(new Point(
                    (a + aa) * Math.sin(T) * Math.cos(p),
                    b * j,
                    (c + cc) * Math.sin(T) * Math.sin(p),
                ))
                this.edges.push(new Edge(count * j + i, i === count - 1 ? count * j : count * j + i + 1));
                if (j > 0) {
                    this.edges.push(new Edge(count * j + i, count * (j - 1) + i));
                    this.polygons.push(new Polygon([
                        count * j + i,
                        i === count - 1 ? count * j : count * j + i + 1,
                        i === count - 1 ? count * (j - 1) : count * (j - 1) + i + 1,
                        i === count - 1 ? count * (j - 1) + i : count * (j - 1) + i,
                    ]))
                }
            }
        }

        for (let j = 0; j < count / 2; j++) {
            const T = Math.PI / count * (j + 1);
            for (let i = 0; i < count; i++) {
                const p = 2 * Math.PI / count * i;
                const aa = a * Math.sqrt(1 + j * j);
                const cc = c * Math.sqrt(1 + j * j);
                this.points.push(new Point(
                    (a + aa) * Math.sin(T) * Math.cos(p),
                    -b * j,
                    (c + cc) * Math.sin(T) * Math.sin(p),
                ))
                this.edges.push(new Edge(count * (count / 2 + j) + i, i === count - 1 ? count * (count / 2 + j) : count * (count / 2 + j) + i + 1));
                if (j > 0) {
                    this.edges.push(new Edge(count * (count / 2 + j) + i, count * (count / 2 + j - 1) + i));
                    this.polygons.push(new Polygon([
                        count * (count / 2 + j) + i,
                        i === count - 1 ? count * (count / 2 + j) : count * (count / 2 + j) + i + 1,
                        i === count - 1 ? count * (count / 2 + j - 1) : count * (count / 2 + j - 1) + i + 1,
                        i === count - 1 ? count * (count / 2 + j - 1) + i : count * (count / 2 + j - 1) + i,
                    ]))
                }
            }
        }
    }
}