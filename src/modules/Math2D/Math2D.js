export default class Math2D {
  getZero(f, a, b, eps = 0.001) {
    if (f(a) * f(b) > 0) return null;
    if (f(a) === 0) return a;
    if (f(b) === 0) return b;
    if (Math.abs(f(b) - f(a)) <= eps) return (a + b) / 2;

    const half = (a + b) / 2;
    if (f(a) * f(half) <= 0) return this.getZero(f, a, half, eps);
    if (f(b) * f(half) <= 0) return this.getZero(f, half, b, eps);

    return null;
  }

  getDerivative(f, x0, dx = 0.0000001) {
    return (f(x0 + dx) - f(x0)) / dx;
  }

  getIntegral(num, a, b, d = 1000, funcs) {
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
