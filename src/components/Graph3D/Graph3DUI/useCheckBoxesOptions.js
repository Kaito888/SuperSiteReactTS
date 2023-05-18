const useCheckBoxesOptions = ({
  show,
  canPrintShadows,
  canAnimate,
  showHidePoints,
  showHideEdges,
  showHidePolygons,
  canPrintShadowsHandler,
  canDoAnimationHandler,
}) => {
  return [
    {
      text: "Точки",
      checked: show.showPoints,
      callback: showHidePoints,
    },
    {
      text: "Рёбра",
      checked: show.showEdges,
      callback: showHideEdges,
    },
    {
      text: "Полигоны",
      checked: show.showPolygons,
      callback: showHidePolygons,
    },
    {
      text: "Затенённость",
      checked: canPrintShadows,
      callback: canPrintShadowsHandler,
    },
    {
      text: "Проигрывать анимацию",
      checked: canAnimate,
      callback: canDoAnimationHandler,
    },
  ];
};

export default useCheckBoxesOptions;
