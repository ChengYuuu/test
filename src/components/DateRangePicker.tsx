import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import dayjs, { Dayjs } from 'dayjs';

type DateRangePickerProps = {
  startDate: Dayjs;
  setStartDate: Dispatch<SetStateAction<Dayjs>>;
  endDate: Dayjs;
  setEndDate: Dispatch<SetStateAction<Dayjs>>;
};

const DateRangePicker = ({ startDate, setStartDate, endDate, setEndDate }: DateRangePickerProps) => {
  return (
    <div className='flex flex-wrap md:flex-nowrap w-full max-w-md justify-center items-center'>
      <input
        type='date'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5'
        value={startDate.format('YYYY-MM-DD')}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setStartDate(dayjs(event.target.value).startOf('day'))}
        max={endDate.format('YYYY-MM-DD')}
        min={dayjs().subtract(1, 'year').startOf('day').format('YYYY-MM-DD')}
      />
      <span className='mx-4 text-gray-500'>to</span>
      <input
        type='date'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5'
        value={endDate.format('YYYY-MM-DD')}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setEndDate(dayjs(event.target.value).endOf('day'))}
        min={startDate.format('YYYY-MM-DD')}
        max={dayjs().endOf('day').format('YYYY-MM-DD')}
      />
    </div>
  );
};

export default DateRangePicker;
