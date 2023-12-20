import { Point, Polygon, Rectangle } from ".";

// TODO: add tests
export const substractOffset = (point: Point, offset: Point): Point => {
  return [point[0] - offset[0], point[1] - offset[1]];
};

// TODO: add tests
export const rectangleToPolygon = ({
  startPoint,
  endPoint,
}: Rectangle): Polygon => {
  return [
    // top left
    startPoint,
    // top right
    [endPoint[0], startPoint[1]],
    // bottom right
    endPoint,
    // bottom left
    [startPoint[0], endPoint[1]],
  ];
};
