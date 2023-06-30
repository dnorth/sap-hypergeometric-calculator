import TurtlePackJson from "../data/TurtlePack.json";
import PuppyPackJson from "../data/PuppyPack.json";
import StarPackJson from "../data/StarPack.json";
import GoldenPackJson from "../data/GoldenPack.json";
import GeneralInfoJson from "../data/GeneralInfo.json";

import Pack from "../types/Pack";
import { FormulaValues } from "../types/SimpleView";

export const calculateProbabilities = (values: FormulaValues) => {
  const packInfo = getPackInfo(values.pack);
  const generalInfo = getGeneralInfo();
  const relevantTurnNumber = getRelevantTurnNumber(values.turnNumber);

  const turnInfo = packInfo[relevantTurnNumber];
  const numSlotsAvailable =
    generalInfo[relevantTurnNumber].slots - values.numFrozenSlots;
  const totalPetsOnTurn = turnInfo.total.pets;

  const singleRollProbability = getProbabilityOfSingleRoll(
    totalPetsOnTurn,
    values.numPets,
    numSlotsAvailable
  );

  return (100 * singleRollProbability).toFixed(1);
};

const getProbabilityOfSingleRoll = (
  totalPets: number,
  numPetsWanted: number,
  numSlotsAvailable: number
) => {
  const probabilityOfOneSlot = (totalPets - numPetsWanted) / totalPets;

  return 1 - Math.pow(probabilityOfOneSlot, numSlotsAvailable);
};

const getRelevantTurnNumber = (turnNumber: number) => {
  //packs don't get more pets or food after turn 11.
  const MAX_RELEVANT_TURN = 11;

  const nearestOddNumber = turnNumber % 2 === 0 ? turnNumber - 1 : turnNumber;

  return Math.min(MAX_RELEVANT_TURN, nearestOddNumber);
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
