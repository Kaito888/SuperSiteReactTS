import { Point } from '.';

export type TRGB = {
    r: number;
    g: number;
    b: number
}

export enum EDistance {
    distance = 'distance',
    lumen = 'lumen'
}

export default class Polygon {
    points: number[];
    color: TRGB;
    [EDistance.distance]: number;
    [EDistance.lumen]: number[];
    center: Point;
    visible: boolean;
    figureIndex: number;
    R: number;

    constructor(points : number[] = [], color = '#6099ff') {
        this.points = points;
        this.color = typeof color === 'string' ? this.hexToRgb(color) : color;
        this.distance = 0;
        this.lumen = [];
        this.center = new Point();
        this.visible = true;
        this.figureIndex = 0;
        this.R = 1;
    }

    hexToRgb(hex: string): TRGB {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        } : { r: 0, g: 0, b: 0 };
    }

    rgbToString(r: number, g: number, b: number): string {
        return `rgb(${r},${g},${b})`;
    }

    rgbToHex(polygon: TRGB): string {
        let { r, g, b } = polygon;
        let R: string, G: string, B: string;
        R = r === 0 ? '00' : r.toString(16);
        G = g === 0 ? '00' : g.toString(16);
        B = b === 0 ? '00' : b.toString(16);
        return `'#${R}${G}${B}'`;
    }
}