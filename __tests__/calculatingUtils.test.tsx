import { FormulaValues } from "../types/SimpleView";
import {
  getRelevantTurnNumber,
  getShopChance,
  calculateProbabilities,
} from "../utils/calculatingUtils";

import { CDFValues } from "../types/cdfUtil";

import Pack from "../types/Pack";

describe("calculateProbabilities", () => {
  describe("Turtle Pack", () => {
    describe("simple scenario", () => {
      const values: FormulaValues = {
        pack: Pack.Turtle,
        turnNumber: 1,
        numPetsToFind: 1,
        numFrozenSlots: 0,
      };

      it("should calculate probability array correctly", () => {
        const expected: CDFValues = [
          { roll: 1, probability: 0.271 },
          { roll: 2, probability: 0.469 },
        ];

        const actual = calculateProbabilities(values, 2);

        expect(actual).toStrictEqual(expected);
      });
    });

    describe("later turns, complicated scenario. Should equate to probability of 3/60 pets with 3 available slots", () => {
      const values: FormulaValues = {
        pack: Pack.Turtle,
        turnNumber: 20,
        numPetsToFind: 3,
        numFrozenSlots: 2,
      };

      it("should calculate probability array correctly", () => {
        const expected: CDFValues = [
          { roll: 1, probability: 0.143 },
          { roll: 2, probability: 0.266 },
          { roll: 3, probability: 0.371 },
          { roll: 4, probability: 0.461 },
          { roll: 5, probability: 0.538 },
          { roll: 6, probability: 0.604 },
        ];

        const actual = calculateProbabilities(values, 6);

        expect(actual).toStrictEqual(expected);
      });
    });
  });
});

describe("getRelevantTurnNumber", () => {
  describe("when turn number is above MAX_RELEVANT_TURN (11)", () => {
    const turnNumber = 20;
    const actual = getRelevantTurnNumber(turnNumber);

    it("should return turn number", () => {
      const expected = 11;

      expect(actual).toBe(expected);
    });
  });

  describe("when turn number is below MIN_RELEVANT_TURN (1)", () => {
    const turnNumber = 0;
    const actual = getRelevantTurnNumber(turnNumber);

    it("should return turn number", () => {
      const expected = 1;

      expect(actual).toBe(expected);
    });
  });

  describe("when turn number is odd", () => {
    const turnNumber = 3;
    const actual = getRelevantTurnNumber(turnNumber);

    it("should return turn number", () => {
      const expected = 3;

      expect(actual).toBe(expected);
    });
  });
  describe("when turn number is even", () => {
    const turnNumber = 4;
    const actual = getRelevantTurnNumber(turnNumber);

    it("should return closest odd turn number (rounded down)", () => {
      const expected = 3;

      expect(actual).toBe(expected);
    });
  });
});

describe("getShopChance", () => {
  describe("when determining probability for 40 pets, wanting 1 pet with 3 available slots", () => {
    const totalPets = 40;
    const numPetsWanted = 1;
    const numSlotsAvailable = 3;

    it("should return correct probability", () => {
      const expected = 0.073;

      const actual = getShopChance(totalPets, numPetsWanted, numSlotsAvailable);

      expect(actual).toBe(expected);
    });
  });

  describe("when determining probability for 40 pets, wanting 3 pets with 3 available slots", () => {
    const totalPets = 40;
    const numPetsWanted = 3;
    const numSlotsAvailable = 3;

    it("should return correct probability", () => {
      const expected = 0.209;

      const actual = getShopChance(totalPets, numPetsWanted, numSlotsAvailable);

      expect(actual).toBe(expected);
    });
  });
});
