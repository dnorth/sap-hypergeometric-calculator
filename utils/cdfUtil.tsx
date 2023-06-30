function binomialCumulativeProbability(n: number, p: number): number {
  let cumulativeProbability = 0;

  for (let x = 1; x <= n; x++) {
    cumulativeProbability += binomialProbability(n, x, p);
  }

  return cumulativeProbability;
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

export default binomialCumulativeProbability;
