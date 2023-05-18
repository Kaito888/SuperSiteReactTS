import {Point} from '../entities';
export default class Polygon {
    constructor(points = [], color = '#6099ff') {
        this.points = points;
        this.lumen = [];
        this.color = typeof color === 'string' ? this.hexToRgb(color) : color;
        this.center = new Point();
        this.distance = 0;
        this.visible = true;
        this.figureIndex = 0;
        this.R = 1;
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        } : { r: 0, g: 0, b: 0 };
    }

    rgbToString(r, g, b) {
        return `rgb(${r},${g},${b})`;
    }

    rgbToHex(polygon) {
        let {r, g, b} = polygon;
        r = r === 0 ? '00' : r.toString(16);
        g = g === 0 ? '00' : g.toString(16);
        b = b === 0 ? '00' : b.toString(16);
        return `'#${r}${g}${b}'`;
    }
}