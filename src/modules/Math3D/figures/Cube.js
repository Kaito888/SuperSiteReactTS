import {Point, Edge, Polygon, Figure } from '../entities';

export default class Cube extends Figure {
    constructor(x = 5, y = 5, z = 5) {
        super();
        this.points = [
            new Point(x, y, z),
            new Point(x, y, -z),
            new Point(x, -y, z),
            new Point(x, -y, -z),
            new Point(-x, y, z),
            new Point(-x, y, -z),
            new Point(-x, -y, z),
            new Point(-x, -y, -z),
        ];
        this.edges = [
            new Edge(0, 1),
            new Edge(0, 2),
            new Edge(0, 4),
            new Edge(1, 3),
            new Edge(1, 5),
            new Edge(2, 3),
            new Edge(2, 6),
            new Edge(3, 7),
            new Edge(4, 5),
            new Edge(4, 6),
            new Edge(5, 7),
            new Edge(6, 7),
        ]
        this.polygons = [
            new Polygon([0, 1, 3, 2]),
            new Polygon([0, 1, 5, 4]),
            new Polygon([1, 3, 7, 5]),
            new Polygon([4, 5, 7, 6]),
            new Polygon([2, 3, 7, 6]),
            new Polygon([0, 2, 6, 4]),
        ]
    }
}