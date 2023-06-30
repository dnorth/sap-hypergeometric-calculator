import { useState, Dispatch, SetStateAction, useEffect } from "react";

import { calculateProbabilities } from "../../utils/calculatingUtils";

import Pack from "../../types/Pack";
import { FormulaValues } from "../../types/SimpleView";
import styles from "./SimpleView.module.css";

export default function SimpleView() {
  const [formulaValues, setFormulaValues] = useState<FormulaValues>({
    pack: Pack.Turtle,
    turnNumber: 1,
    numPets: 1,
    numRolls: 1,
    numFrozenSlots: 0,
  });
  const [probabilities, setProbabilities] = useState<string | null>(null);

  useEffect(() => {
    setProbabilities(calculateProbabilities(formulaValues));
  }, [formulaValues]);

  return (
    <>
      <form className={styles.form}>
        <PackSelect
          value={formulaValues.pack}
          name="pack"
          onChange={setFormulaValues}
        />
        <InputField
          label="Turn Number: "
          value={formulaValues.turnNumber}
          name="turnNumber"
          onChange={setFormulaValues}
        />
        <InputField
          label="Number of pets you're rolling for: "
          value={formulaValues.numPets}
          name="numPets"
          onChange={setFormulaValues}
        />
        <InputField
          label="Number of rolls: "
          value={formulaValues.numRolls}
          name="numRolls"
          onChange={setFormulaValues}
        />
        <InputField
          label="Number of frozen slots: "
          value={formulaValues.numFrozenSlots}
          name="numFrozenSlots"
          onChange={setFormulaValues}
        />
      </form>
      {probabilities && (
        <div className={styles.probabilitiesContainer}>
          Probability to find at least 1 pet given {formulaValues.numRolls}{" "}
          roll(s): {probabilities}%
        </div>
      )}
    </>
  );
}

const InputField = ({
  label,
  value,
  name,
  onChange,
}: {
  label: string;
  value: number;
  name: string;
  onChange: Dispatch<SetStateAction<FormulaValues>>;
}) => {
  const onLocalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange((prevState) => ({
      ...prevState,
      [name]: Number.isNaN(event.target.valueAsNumber)
        ? 0
        : event.target.valueAsNumber,
    }));
  };

  return (
    <div>
      <label>{label}</label>
      <input
        type="number"
        defaultValue={value}
        name={name}
        onChange={(event) => onLocalChange(event)}
      />
    </div>
  );
};

const PackSelect = ({
  value,
  name,
  onChange,
}: {
  value: Pack;
  name: string;
  onChange: Dispatch<SetStateAction<FormulaValues>>;
}) => {
  const packs = Object.entries(Pack);

  const onLocalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange((prevState) => ({
      ...prevState,
      [name]: event.target.value,
    }));
  };

  return (
    <div>
      <label htmlFor="pack">Pack: </label>
      <select
        id="pack"
        defaultValue={value}
        onChange={(event) => onLocalChange(event)}
      >
        {packs.map(([key, label]) => (
          <option key={key} value={label}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
