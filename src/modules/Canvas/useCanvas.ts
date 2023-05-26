import Canvas from "./Canvas";
import { TWIN_2D, TWIN_3D } from "./TWIN";

type TCanvasOptions = {
  id: string,
  width: number,
  height: number,
  WIN: TWIN_2D | TWIN_3D,
  callbacks: Function[]
}

export default function useCanvas(render = (outFPS: number) => { }) {
  window.requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback: Function) {
        window.setTimeout(callback, 100 / 6);
      }
    );
  })();

  let FPS = 0;
  let outFPS = 0;
  let lastTimeStamp = Date.now();
  const animLoop = () => {
    FPS++;
    const timeStamp = Date.now();
    if (timeStamp - lastTimeStamp >= 1000) {
      outFPS = FPS;
      FPS = 0;
      lastTimeStamp = timeStamp;
    }
    render(outFPS);
    window.requestAnimFrame(animLoop);
  };
  return (params: TCanvasOptions) => {
    animLoop();
    return new Canvas(params);
  };
}
