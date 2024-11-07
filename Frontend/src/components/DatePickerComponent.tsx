// DatePickerComponent.tsx
import { format } from 'date-fns';
import { Calendar } from '@phosphor-icons/react';
import { useState } from 'react';
import { Button, DatePicker, Popover, PopoverAction, PopoverContent } from 'keep-react';
import { DateRange as DayPickerDateRange } from 'react-day-picker';

type DatePickerComponentProps = {
  onDateChange: (fromDate: string, toDate: string) => void;
};

export const DatePickerComponent: React.FC<DatePickerComponentProps> = ({ onDateChange }) => {
  const [selected, setSelected] = useState<DayPickerDateRange | undefined>();

  const handleDateSelect = (range: DayPickerDateRange | undefined) => {
    setSelected(range);
    if (range?.from && range?.to) {
      onDateChange(format(range.from, 'yyyy-MM-dd'), format(range.to, 'yyyy-MM-dd'));
    }
  };

  return (
    <Popover>
      <PopoverAction asChild>
        <Button
          color="secondary"
          size="lg"
          className="border border-slateGray bg-white text-slateGray rounded-lg lg:w-[300px] w-full h-[50px] p-2 flex items-center justify-start hover:bg-white hover:text-slateGray"
          variant="outline"
        >
          <Calendar size={20} className="mr-1 text-slate-500" />
          <div className="font-normal text-slate-500">
            {selected ? (
              <>
                {format(selected.from ?? new Date(), 'LLL dd, y')} -{' '}
                {format(selected.to ?? new Date(), 'LLL dd, y')}
              </>
            ) : (
              <span className="font-normal text-slate-500">Select Your Date</span>
            )}
          </div>
        </Button>
      </PopoverAction>
      <PopoverContent align="start" className="border-0 max-w-min">
        <DatePicker
          mode="range"
          numberOfMonths={2}
          selected={selected}
          onSelect={handleDateSelect}
          showOutsideDays={true}
        />
      </PopoverContent>
    </Popover>
  );
};
