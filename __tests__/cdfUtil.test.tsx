import cdfOverN, { binomialCumulativeProbability } from "../utils/cdfUtil";
import { CDFValues } from "../types/cdfUtil";

describe("binomialCumulativeProbability", () => {
  describe("with probability 0.5, number of trials 3, number of successes 1", () => {
    const n = 3;
    const p = 0.5;

    const actual = binomialCumulativeProbability(n, p);

    it("should calculate CDF and return total", () => {
      const expected = 0.875;
      expect(actual).toBe(expected);
    });
  });

  describe("with probability 0.2, number of trials 5, number of successes 1", () => {
    const n = 5;
    const p = 0.2;

    const actual = binomialCumulativeProbability(n, p);

    it("should calculate CDF and return total", () => {
      const expected = 0.672;
      expect(actual).toBe(expected);
    });
  });

  describe("with probability 0.2, number of trials 5, number of successes 3", () => {
    const n = 5;
    const p = 0.2;
    const x = 3;

    const actual = binomialCumulativeProbability(n, p, x);

    it("should calculate CDF and return total", () => {
      const expected = 0.058;
      expect(actual).toBe(expected);
    });
  });
});

describe("cdfOverN", () => {
  describe("with probability 0.5, number of trials 3, number of successes 1", () => {
    const n = 3;
    const p = 0.5;

    const actual = cdfOverN(n, p);

    it("should calculate CDF over N rolls and return the array of probabilities", () => {
      const expected: CDFValues = [
        { roll: 1, probability: 0.5 },
        { roll: 2, probability: 0.75 },
        { roll: 3, probability: 0.875 },
      ];

      expect(actual).toStrictEqual(expected);
    });
  });

  describe("with probability 0.2, number of trials 5, number of successes 1", () => {
    const n = 5;
    const p = 0.2;

    const actual = cdfOverN(n, p);

    it("should calculate CDF over N rolls and return the array of probabilities", () => {
      const expected: CDFValues = [
        { roll: 1, probability: 0.2 },
        { roll: 2, probability: 0.36 },
        { roll: 3, probability: 0.488 },
        { roll: 4, probability: 0.59 },
        { roll: 5, probability: 0.672 },
      ];

      expect(actual).toStrictEqual(expected);
    });
  });

  /*
    This test shows me that what i'm trying to do is not exactly 100% what this algorithm is. 
    The algorithm is correct, but the way I am using it is not EXACTLY correct for the use case.
    The idea is that I have 5 rolls and I want to find the probability of finding 3 pets with those 5 rolls.

    With the way i'm using this algorithm, it shows probability of 0% for rolls 1-2. 0% is incorrect because
    there is a SMALL chance that all 3 spaces of a shop are the 3 pets I want. 
    It says 0% because i'm rolling in the probability of finding 3/10 pets (on turn 1 for example) into
    a single roll, which isn't technically correct.

    If I were wanting to do this correctly, i'd have to calculate the CDF where the probability is not the
    "shop chance" but rather the "space chance". That would then be correct. 
    
    But since this use-case is pretty edge-case, and I may not even allow X>1 for now, i'm not going to change it.

    Just making a note so I remember this if it becomes relevant in the future.
  */
  describe("with probability 0.2, number of trials 5, number of successes 3", () => {
    const n = 5;
    const p = 0.2;
    const x = 3;

    const actual: CDFValues = cdfOverN(n, p, x);

    it("should calculate CDF over N rolls and return the array of probabilities", () => {
      const expected = [
        { roll: 1, probability: 0 },
        { roll: 2, probability: 0 },
        { roll: 3, probability: 0.008 },
        { roll: 4, probability: 0.027 },
        { roll: 5, probability: 0.058 },
      ];

      expect(actual).toStrictEqual(expected);
    });
  });
});
