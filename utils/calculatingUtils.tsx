import TurtlePackJson from "../data/TurtlePack.json";
import PuppyPackJson from "../data/PuppyPack.json";
import StarPackJson from "../data/StarPack.json";
import GoldenPackJson from "../data/GoldenPack.json";

import Pack from "../types/Pack";
import { FormulaValues } from "../types/SimpleView";

export const calculateProbabilities = (values: FormulaValues) => {
  const packInfo = getPackInfo(values.pack);

  return null;
};

const getPackInfo = (pack: Pack) => {
  const packMap = {
    [Pack.Turtle]: TurtlePackJson,
    [Pack.Puppy]: PuppyPackJson,
    [Pack.Star]: StarPackJson,
    [Pack.Golden]: GoldenPackJson,
  };

  return packMap[pack] || packMap[Pack.Turtle];
};
