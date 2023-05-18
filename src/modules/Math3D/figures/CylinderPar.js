import { Point, Edge, Polygon, Figure } from '../entities';

export default class CylinderPar extends Figure {
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
                        a * i * (k === 0 ? 1 : -1),
                        b * j,
                        c * i * i,
                    ))
                    if (i !== count - 1) {
                        this.edges.push(new Edge(count * j + i, count * j + i + 1));
                    }
                    if (j > 0) {
                        this.edges.push(new Edge(count * j + i, count * (j - 1) + i));
                        if (i !== count - 1) {
                            this.polygons.push(new Polygon([
                                num + count * j + i,
                                num + count * j + i + 1,
                                num + count * (j - 1) + i + 1,
                                num + count * (j - 1) + i,
                            ]))
                        }

                    }
                }
            }
        }
    }
}