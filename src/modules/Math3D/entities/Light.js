import Point from './Point';
export default class Light extends Point {
    constructor(x, y, z, lumen = 10000, color = '#ffffff') {
        super(x, y, z);
        this.lumen = lumen;
        this.color = this.hexToRgb(color);
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        } : { r: 0, g: 0, b: 0 };
    }
}