import { Figure, Light, Point, Polygon, EDistance } from './entities';
import { TWIN_3D } from '../Canvas/TWIN';

interface IMath3DOptions {
    WIN: TWIN_3D;
}

type TMatrix = number[][];
type TVector = number[];
type TShadow = {
    isShadow: boolean;
    dark?: number;
}

export enum ETransform {
    zoom = 'zoom',
    move = 'move',
    rotateOx = 'rotateOx',
    rotateOy = 'rotateOy',
    rotateOz = 'rotateOz',
    drag = 'drag'
}

const win: TWIN_3D = {
    LEFT: -5,
    BOTTOM: -5,
    WIDTH: 10,
    HEIGHT: 10,
    FOCUS: new Point(0, 0, 30),
    CAMERA: new Point(0, 0, 40),
}

export default class Math3D {
    WIN: TWIN_3D;

    constructor(options: IMath3DOptions) {
        //const { WIN } = options;
        //this.WIN = WIN;
        this.WIN = win;
    }

    xs(point: Point): number {
        const zs = this.WIN.FOCUS.z;
        const z0 = this.WIN.CAMERA.z;
        const x0 = this.WIN.CAMERA.x;
        return (point.x - x0) / (point.z - z0) * (zs - z0) + x0;
    }

    ys(point: Point): number {
        const zs = this.WIN.FOCUS.z;
        const z0 = this.WIN.CAMERA.z;
        const y0 = this.WIN.CAMERA.y;
        return (point.y - y0) / (point.z - z0) * (zs - z0) + y0;
    }

    changePolygonVisiblity(figure: Figure): void {
        const center = figure.center;
        figure.polygons.forEach(polygon => {
            const p = polygon.center;
            const c = this.WIN.CAMERA;
            const poly = new Point(p.x - center.x, p.y - center.y, p.z - center.z);
            const cam = new Point(c.x - center.x, c.y - center.y, c.z - center.z);
            const scalMult = poly.x * cam.x + poly.y * cam.y + poly.z * cam.z;
            if (scalMult < -0.1) {
                polygon.visible = false;
            } else {
                polygon.visible = true;
            }
        })
    }

    mult(T: TMatrix, m: TVector): TVector {
        const c = [0, 0, 0, 0];
        for (let i = 0; i < 4; i++) {
            let s = 0;
            for (let j = 0; j < 4; j++) {
                s += T[j][i] * m[j];
            }
            c[i] = s;
        }
        return c;
    }

    multMatrix(a: TMatrix, b: TMatrix): TMatrix {
        const c = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let s = 0;
                for (let k = 0; k < 4; k++) {
                    s += a[i][k] * b[k][j];
                }
                c[i][j] = s;
            }
        }
        return c;
    }

    [ETransform.zoom](delta: number): TMatrix {
        return [[delta, 0, 0, 0],
        [0, delta, 0, 0],
        [0, 0, delta, 0],
        [0, 0, 0, 1]];
    }

    [ETransform.rotateOx](alpha: number): TMatrix {
        const sin = Math.sin(alpha);
        const cos = Math.cos(alpha);
        return [[1, 0, 0, 0],
        [0, cos, sin, 0],
        [0, -sin, cos, 0],
        [0, 0, 0, 1]];
    }

    [ETransform.rotateOy](alpha: number): TMatrix {
        const sin = Math.sin(alpha);
        const cos = Math.cos(alpha);
        return [[cos, 0, -sin, 0],
        [0, 1, 0, 0],
        [sin, 0, cos, 0],
        [0, 0, 0, 1]];
    }

    [ETransform.rotateOz](alpha: number): TMatrix {
        const sin = Math.sin(alpha);
        const cos = Math.cos(alpha);
        return [[cos, sin, 0, 0],
        [-sin, cos, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]];
    }

    [ETransform.drag](dx = 0, dy = 0, dz = 0): TMatrix {
        return [[1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [dx, dy, dz, 1]];
    }

    transform(matrix: TMatrix, point: Point): void {
        const c = [point.x, point.y, point.z, 1];
        const result = this.mult(matrix, c);
        point.x = result[0];
        point.y = result[1];
        point.z = result[2];
    }

    getTransformMatrix(...args: TMatrix[]): TMatrix {
        return args.reduce(
            (sum, matrix) =>
                this.multMatrix(sum, matrix),
            [[1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]]);
    }

    calcCenter(figure: Figure): void {
        let x = 0, y = 0, z = 0;
        figure.points.forEach(point => {
            x += point.x;
            y += point.y;
            z += point.z;
        })
        const s = figure.points.length;
        figure.center.x = x / s;
        figure.center.y = y / s;
        figure.center.z = z / s;
    }

    calcCenters(figure: Figure): void {
        figure.polygons.forEach(polygon => {
            const points = polygon.points;
            let x = 0, y = 0, z = 0;
            for (let i = 0; i < points.length; i++) {
                x += figure.points[points[i]].x;
                y += figure.points[points[i]].y;
                z += figure.points[points[i]].z;
            }
            polygon.center.x = x / points.length;
            polygon.center.y = y / points.length;
            polygon.center.z = z / points.length;
        })
    }

    calcDistance(figure: Figure, endPoint: Point, name: EDistance.distance): void {
        figure.polygons.forEach(polygon => {
            polygon[name] = Math.sqrt(
                Math.pow(endPoint.x - polygon.center.x, 2) +
                Math.pow(endPoint.y - polygon.center.y, 2) +
                Math.pow(endPoint.z - polygon.center.z, 2)
            )
        });
    }

    sortByArtistAlgorythm(polygons: Polygon[]): void {
        polygons.sort((a, b) => b.distance - a.distance);
    }

    calcIllumination(distance: number, lumen: number): number {
        const res = distance ? lumen / Math.pow(distance, 3) : 1;
        return res > 1 ? 1 : res;
    }

    calcVector(a: Point, b: Point): Point {
        return {
            x: b.x - a.x,
            y: b.y - a.y,
            z: b.z - a.z,
        }
    }

    vectorProd(a: Point, b: Point): Point {
        return {
            x: a.y * b.z - a.z * b.y,
            y: -a.x * b.z + a.z * b.x,
            z: a.x * b.y - a.y * b.x,
        }
    }

    calcVectorModule(a: Point): number {
        return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
    }

    calcRadius(figure: Figure): void {
        const points = figure.points;
        figure.polygons.forEach(polygon => {
            const center = polygon.center;
            const p1 = points[polygon.points[0]];
            const p2 = points[polygon.points[1]];
            const p3 = points[polygon.points[2]];
            const p4 = points[polygon.points[3]];
            polygon.R = (this.calcVectorModule(this.calcVector(center, p1)) +
                this.calcVectorModule(this.calcVector(center, p2)) +
                this.calcVectorModule(this.calcVector(center, p3)) +
                this.calcVectorModule(this.calcVector(center, p4))) / 4
        });
    }

    calcShadow(polygon: Polygon, figures: Figure[], light: Light, index: number): TShadow {
        const M1 = polygon.center;
        const r = polygon.R;
        const s = this.calcVector(M1, light);
        for (let i = 0; i < figures.length; i++) {
            if (polygon.figureIndex === i) {
                continue;
            }
            for (let j = 0; j < figures[i].polygons.length; j++) {
                const polygon2 = figures[i].polygons[j];
                const M0 = polygon2.center;
                if (polygon.lumen[index] > polygon2.lumen[index]) {
                    continue;
                }
                const moduleS = this.calcVectorModule(s);
                const dark = this.calcVectorModule(this.vectorProd(this.calcVector(M0, M1), s)) / moduleS;
                if (dark < r) {
                    return {
                        isShadow: true,
                        dark: dark * 2,
                    };
                }
            }
        }
        return {
            isShadow: false,
        };
    }
}