import { useEffect } from "react";

import Graph2DUI from "./Graph2DUI/Graph2DUI";
import useCanvas from "../../modules/Canvas/useCanvas.ts";
import Math2D from "../../modules/Math2D/Math2D.ts";

//из graph2dui функции сделать в компоненту

const Graph2D = () => {
  const Canvas = useCanvas(render);

  const math2D = new Math2D();

  const WIN = {
    left: -10,
    bottom: -10,
    width: 20,
    height: 20,
  };
  const funcs = [];
  const derivatives = [];
  const zeros = [];
  const zoom = 0.8;
  let canMove = false;

  let canvas = null;

  useEffect(() => {
    canvas = Canvas({
      id: 'canvas2D',
      width: 800,
      height: 800,
      WIN,
      callbacks: {
        wheel,
        mouseUp,
        mouseDown,
        mouseMove,
        mouseLeave,
      },
    });

    return () => {
      canvas = null;
    };
  });

  /* *************** */
  /* about callbacks */
  /* *************** */

  function addFunction(f, num) {
    if (f instanceof Function) {
      if (funcs[num]) {
        funcs[num].f = f;
      } else {
        funcs[num] = { f, color: "red", width: 2 };
      }
    }
  }

  function delFunction(num) {
    funcs[num] = null;
  }

  function setColorFunction(color, num) {
    if (color && num) {
      funcs[num].color = color;
    }
  }

  function wheel(event) {
    const delta = event.wheelDelta > 0 ? -zoom : zoom;
    if (WIN.width > zoom || delta > 0) {
      WIN.width += delta;
      WIN.height += delta;
      WIN.left -= delta / 2;
      WIN.bottom -= delta / 2;
    }
  }

  function mouseDown() {
    canMove = true;
  }
  function mouseUp() {
    canMove = false;
  }
  function mouseLeave() {
    canMove = false;
  }
  function mouseMove(event) {
    if (canvas) {
      if (canMove) {
        const { movementX, movementY } = event;
        WIN.left -= canvas.sx(movementX);
        WIN.bottom -= canvas.sy(movementY);
      }
    }
  }

  function changeZeroAndDerivative(num) {
    derivatives[num] = { func: funcs[num].f, color: "blue" };
    if (zeros[num]) {
      zeros[num].num = num;
    } else {
      zeros[num] = { num: num };
    }
  }

  function deleteZeroAndDerevative(num) {
    derivatives[num] = null;
    zeros[num].num = null;
  }

  function changeGraph(width, color) {
    if (width) {
      funcs.forEach((func) => (func.width = width));
    }
    if (color) {
      funcs.forEach((func) => {
        if (func) {
          func.color = color;
        }
      });
    }
  }

  function changeZero(num, c, segment) {
    if (!zeros[num]) {
      zeros[num] = {};
    }
    if (segment === "a") {
      zeros[num].a = c - 0;
    }
    if (segment === "b") {
      zeros[num].b = c - 0;
    }
  }

  /* *********** */
  /* about print */
  /* *********** */

  function printOXY() {
    const { left, bottom, height, width } = WIN;

    for (let x = 0; x < left + width; x += 1) {
      canvas.line(x, -bottom, x, -(bottom + height), "white");
    }
    for (let x = 0; x > left; x -= 1) {
      canvas.line(x, -bottom, x, -(bottom + height), "white");
    }
    for (let y = 0; y > -(bottom + height); y -= 1) {
      canvas.line(left, y, left + width, y, "white");
    }
    for (let y = 0; y < -bottom; y += 1) {
      canvas.line(left, y, left + width, y, "white");
    }

    canvas.line(left, 0, width + left, 0, "#1A224B", 2); //оси
    canvas.line(0, -bottom, 0, -(bottom + height), "#1A224B", 2);

    canvas.line(0, -bottom, 1, -bottom - 1, "#1A224B", 2); //стрелочки
    canvas.line(0, -bottom, -1, -bottom - 1, "#1A224B", 2);

    canvas.line(left + width, 0, left + width - 1, -1, "#1A224B", 2);
    canvas.line(left + width, 0, left + width - 1, 1, "#1A224B", 2);

    //подписи осей и центра
    canvas.text("x", left + width - 0.5, -1);
    canvas.text("y", 1, -bottom - 0.7);
    canvas.text("0", -0.5, -0.8);
  }

  function render(event) {
    if (canvas) {
      canvas.clear("#C7CFFF");

      printOXY();

      zeros.forEach((zero) => {
        if ((zero.num || zero.num === 0) && zero.a < zero.b) {
          printZero(zero.num, zero.a, zero.b);
          math2D.getIntegral(zero.num, zero.a - 0, zero.b - 0, funcs);
          printIntegral(zero.num, zero.a - 0, zero.b - 0);
        }
      });

      funcs.forEach(
        (func) => func && printFunction(func.f, func.color, func.width)
      );

      printDerivative(event);

      canvas.render();
    }
  }

  function printFunction(f, color, width, isDash) {
    const dx = WIN.width / 100;
    let x = WIN.left;

    while (x < WIN.width + WIN.left) {
      const y1 = f(x);
      const y2 = f(x + dx);
      if (Math.abs(y2 - y1) < WIN.height && !isDash) {
        canvas.line(x, y1, x + dx, y2, color, width);
      } else {
        canvas.line(x, y1, x + dx, y2, color, width, true);
      }
      x += dx;
    }
  }

  function printZero(num, a, b) {
    const f = funcs[num].f;
    const zero = math2D.getZero(f, a, b);
    if (zero || f(0) === 0) {
      canvas.point(zero, 0);
    }
  }

  function printDerivative(event) {
    const x0 = canvas.cursorX(event.clientX - 28);
    if (x0) {
      derivatives.forEach((derivative) => {
        if (derivative) {
          const f = derivative.func;
          const k = math2D.getDerivative(f, x0);
          const b = f(x0) - k * x0;
          derivative.f = function (x) {
            return k * x + b;
          };
          printFunction(derivative.f, derivative.color, 2);
        }
      });
    }
  }

  function printIntegral(num, a, b, d = 1000) {
    const f = funcs[num].f;
    const dx = (b - a) / d;
    for (let x = a; x < b; x += dx) {
      canvas.polygon([
        { x: x, y: 0 },
        { x: x + dx, y: 0 },
        { x: x + dx, y: f(x + dx) },
        { x: x, y: f(x + dx) },
      ]);
    }
  }

  return (
    <>
      <Graph2DUI
        addFunction={(f, num) => addFunction(f, num)}
        delFunction={(num) => delFunction(num)}
        setColorFunction={(color, num) => setColorFunction(color, num)}
        changeZeroAndDerivative={(num) => changeZeroAndDerivative(num)}
        deleteZeroAndDerevative={(num) => deleteZeroAndDerevative(num)}
        changeGraph={(width, color) => changeGraph(width, color)}
        changeZero={(num, c, segment) => changeZero(num, c, segment)}
      />
      <canvas id='canvas2D'></canvas>
    </>
  );
};

export default Graph2D;
