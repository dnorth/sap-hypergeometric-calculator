export interface CDF {
  values: CDFValues;
  total: number;
}

export interface CDFValues extends Array<CDFValue> {}

export interface CDFValue {
  roll: number;
  probability: number;
}
