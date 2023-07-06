import TurtlePackJson from "../data/TurtlePack.json";
import PuppyPackJson from "../data/PuppyPack.json";
import StarPackJson from "../data/StarPack.json";
import GoldenPackJson from "../data/GoldenPack.json";
import GeneralInfoJson from "../data/GeneralInfo.json";

import cdf from "./cdfUtil";

import Pack from "../types/Pack";
import { FormulaValues } from "../types/SimpleView";
import { CDFValues } from "../types/cdfUtil";

export const calculateProbabilities = (
  values: FormulaValues,
  numRolls: number = 30
): CDFValues => {
  const packInfo = getPackInfo(values.pack);
  const generalInfo = getGeneralInfo();
  const relevantTurnNumber = getRelevantTurnNumber(values.turnNumber);

  const turnInfo = packInfo[relevantTurnNumber];
  const numSlotsAvailable =
    generalInfo[relevantTurnNumber].slots - values.numFrozenSlots;
  const totalPetsOnTurn = turnInfo.total.pets;

  const singleRollProbability = getShopChance(
    totalPetsOnTurn,
    values.numPetsToFind,
    numSlotsAvailable
  );

  // cdf(N, P);  P(X>=1)
  const cumulativeProbabilityArray = cdf(numRolls, singleRollProbability);

  return cumulativeProbabilityArray;
};

export const getShopChance = (
  totalPets: number,
  numPetsToFind: number,
  numSlotsAvailable: number
) => {
  const probabilityOfOneSlot = (totalPets - numPetsToFind) / totalPets;

  const shopChance = Math.max(
    0,
    1 - Math.pow(probabilityOfOneSlot, numSlotsAvailable)
  );

  return getFixed(shopChance, 3);
};

export const getRelevantTurnNumber = (turnNumber: number) => {
  // turns below 1 dont make sense
  const MIN_RELEVANT_TURN = 1;

  //packs don't get more pets or food after turn 11.
  const MAX_RELEVANT_TURN = 11;

  const nearestOddNumber = turnNumber % 2 === 0 ? turnNumber - 1 : turnNumber;

  //bounded between 1 and 11
  return Math.max(
    MIN_RELEVANT_TURN,
    Math.min(MAX_RELEVANT_TURN, nearestOddNumber)
  );
};

const getPackInfo = (pack: Pack) => {
  const packMap = {
    [Pack.Turtle]: TurtlePackJson,
    [Pack.Puppy]: PuppyPackJson,
    [Pack.Star]: StarPackJson,
    [Pack.Golden]: GoldenPackJson,
  };

  return JSON.parse(JSON.stringify(packMap[pack] || packMap[Pack.Turtle]));
};

const getGeneralInfo = () => {
  return JSON.parse(JSON.stringify(GeneralInfoJson));
};

export const getFixed = (value: number, length: number) =>
  parseFloat(value.toFixed(length));
