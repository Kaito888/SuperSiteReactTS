import Point from './Point.ts';
import { TRGB } from './Polygon.ts';

export default class Light extends Point {
    lumen: number;
    color: TRGB;

    constructor(x: number, y: number, z: number, lumen = 10000, color = '#ffffff') {
        super(x, y, z);
        this.lumen = lumen;
        this.color = this.hexToRgb(color);
    }

    hexToRgb(hex: string): TRGB {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        } : { r: 0, g: 0, b: 0 };
    }
}