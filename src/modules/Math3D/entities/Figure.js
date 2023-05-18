import { Point } from '.';

export default class Figure {
    constructor(points = [], edges = [], polygons = []) {
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.center = new Point();
        this.animations = [];
        this.children = [];
    }

    dropAnimations() {
        this.animations = [];
    }

    dropAnimation(num) {
        this.animations[num].value = 0;
    }

    setAnimation(method, value, center) {
        this.animations.push({
            method: method,
            value: value,
            center: center ? center : this.center,
        });
    }

    updateAnimation(num, method, value, center) {
        this.animations[num] = {
            method: method,
            value: value,
            center: center ? center : this.center,
        };
    }

    doAnimation(math3D) {
        this.animations.forEach(anim => {
            const T2 = math3D[anim.method](anim.value);
            const T1 = math3D.drag(-anim.center.x, -anim.center.y, -anim.center.z);
            const T3 = math3D.drag(anim.center.x, anim.center.y, anim.center.z);
            const matrix = math3D.getTransformMatrix(T1, T2, T3);
            this.points.forEach(point => math3D.transform(matrix, point));
            math3D.transform(matrix, this.center);
        });
    }
}