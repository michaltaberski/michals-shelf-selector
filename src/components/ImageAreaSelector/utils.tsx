import { Point } from ".";

// TODO: add tests
export const substractOffset = (point: Point, offset: Point): Point => {
  return [point[0] - offset[0], point[1] - offset[1]];
};
