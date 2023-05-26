import {
  Cube,
  Sphere,
  Cone,
  CylinderEll,
  CylinderHyp,
  CylinderPar,
  Ellipsoid,
  HyperboloidOne,
  HyperboloidTwo,
  ParaboloidEll,
  ParaboloidHyp,
  Torus,
} from "../../modules/Math3D";

const useFigureOptions = (value = 10) => {
  return [
    {
      type: "Cube",
      result: new Cube(),
    },
    {
      type: "Sphere",
      result: new Sphere(value),
    },
    {
      type: "Ellipsoid",
      result: new Ellipsoid(value),
    },
    {
      type: "Cone",
      result: new Cone(value),
    },
    {
      type: "HyperboloidOne",
      result: new HyperboloidOne(value),
    },
    {
      type: "HyperboloidTwo",
      result: new HyperboloidTwo(value),
    },
    {
      type: "ParaboloidHyp",
      result: new ParaboloidHyp(value),
    },
    {
      type: "ParaboloidEll",
      result: new ParaboloidEll(value),
    },
    {
      type: "CylinderEll",
      result: new CylinderEll(value),
    },
    {
      type: "CylinderHyp",
      result: new CylinderHyp(value),
    },
    {
      type: "CylinderPar",
      result: new CylinderPar(value),
    },
    {
      type: "Torus",
      result: new Torus(value),
    },
  ];
};

export default useFigureOptions;
