import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { StockPeriodType } from "../types/StockData";

type RadioProps = {
  radioValues: { [key: string]: string };
  value: StockPeriodType;
  onChange: Dispatch<SetStateAction<StockPeriodType>>;
}

const Radio = ({ radioValues, value, onChange }: RadioProps) => {
  return (
    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
      {Object.keys(radioValues).map((radioValueKey) => (
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r" key={radioValueKey}>
          <div className="flex items-center pl-3">
            <input
              type="radio"
              value={radioValueKey}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              checked={value === radioValueKey}
              onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value as StockPeriodType)}
            />
            <label className="w-full py-3 ml-2 text-sm font-medium text-gray-900">{radioValues[radioValueKey]}</label>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Radio;
