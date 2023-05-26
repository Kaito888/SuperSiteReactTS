export type TFunc = {
  f: Function,
  color: string,
  width: number
}

export default class Math2D {
  getZero(f: Function, a: number, b: number, eps = 0.001): number | null {
    if (f(a) * f(b) > 0) return null;
    if (f(a) === 0) return a;
    if (f(b) === 0) return b;
    if (Math.abs(f(b) - f(a)) <= eps) return (a + b) / 2;

    const half = (a + b) / 2;
    if (f(a) * f(half) <= 0) return this.getZero(f, a, half, eps);
    if (f(b) * f(half) <= 0) return this.getZero(f, half, b, eps);

    return null;
  }

  getDerivative(f: Function, x0: number, dx = 0.0000001): number {
    return (f(x0 + dx) - f(x0)) / dx;
  }

  getIntegral(num: number, a: number, b: number, d = 1000, funcs: TFunc[]): number {
    const f = funcs[num].f;
    let x = a;
    const dx = (b - a) / d;
    let s = 0;
    while (x < b) {
      if (f(x) * f(x + dx) > 0) {
        s += ((Math.abs(f(x)) + Math.abs(f(x + dx))) * dx) / 2;
      } else {
        s += ((Math.abs(f(x)) + Math.abs(f(x + dx))) * dx) / 4;
      }
      x += dx;
    }
    return s;
  }
}
