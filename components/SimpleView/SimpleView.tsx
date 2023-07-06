import { useState, Dispatch, SetStateAction, useEffect } from "react";

import { calculateProbabilities, getFixed } from "../../utils/calculatingUtils";

import Pack from "../../types/Pack";
import { CDFValues } from "../../types/cdfUtil";
import { FormulaValues } from "../../types/SimpleView";
import styles from "./SimpleView.module.css";

export default function SimpleView() {
  const [formulaValues, setFormulaValues] = useState<FormulaValues>({
    pack: Pack.Turtle,
    turnNumber: 1,
    numPetsToFind: 1,
    numFrozenSlots: 0,
  });
  const [probabilities, setProbabilities] = useState<CDFValues>([]);

  useEffect(() => {
    setProbabilities(calculateProbabilities(formulaValues));
  }, [formulaValues]);

  return (
    <div className={styles.simpleViewContainer}>
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
          label="# of pets you're rolling for: "
          value={formulaValues.numPetsToFind}
          name="numPetsToFind"
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
          {probabilities.map(({ roll, probability }) => (
            <div key={roll}>
              Roll {roll}: {getFixed(100 * probability, 1)}%
            </div>
          ))}
        </div>
      )}
    </div>
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
    <div className={styles.inputContainer}>
      <label htmlFor={name}>{label}</label>
      <input
        type="number"
        defaultValue={value}
        name={name}
        onChange={(event) => onLocalChange(event)}
        className={styles.inputField}
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
    <div className={styles.inputContainer}>
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
