import { getFixed } from "./calculatingUtils";
import { CDFValues } from "../types/cdfUtil";

function cdfOverN(n: number, p: number, x: number = 1): CDFValues {
  return [...Array(n)].map((_, i) => {
    const rollNumber = i + 1;

    return {
      roll: rollNumber,
      probability: binomialCumulativeProbability(rollNumber, p, x),
    };
  });
}

export function binomialCumulativeProbability(
  n: number,
  p: number,
  x: number = 1
): number {
  let cumulativeProbability = 0;

  for (x; x <= n; x++) {
    cumulativeProbability += binomialProbability(n, x, p);
  }

  return getFixed(cumulativeProbability, 3);
}

function binomialProbability(n: number, x: number, p: number): number {
  return combination(n, x) * Math.pow(p, x) * Math.pow(1 - p, n - x);
}

function combination(n: number, k: number): number {
  return factorial(n) / (factorial(k) * factorial(n - k));
}

function factorial(num: number): number {
  if (num === 0 || num === 1) {
    return 1;
  }

  for (let i = num - 1; i >= 1; i--) {
    num *= i;
  }

  return num;
}

export default cdfOverN;
