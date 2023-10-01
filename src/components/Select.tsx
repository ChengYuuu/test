import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { StockPriceType } from '../types/StockData';

type SelectProps = {
  selectValues: { [key: string]: string };
  value: StockPriceType;
  onChange: Dispatch<SetStateAction<StockPriceType>>;
};

const Select = ({ selectValues, value, onChange }: SelectProps) => {
  return (
    <select
      id='countries'
      className='bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 max-w-md'
      value={value}
      onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange(event.target.value as StockPriceType)}
    >
      {Object.keys(selectValues).map((selectValueKey) => (
        <option key={selectValueKey} value={selectValueKey}>
          {selectValues[selectValueKey]}
        </option>
      ))}
    </select>
  );
};

export default Select;
