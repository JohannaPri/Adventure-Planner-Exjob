// DatePickerComponent.tsx
import { format } from 'date-fns';
import { Calendar } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import { Button, DatePicker, Popover, PopoverAction, PopoverContent } from 'keep-react';
import { DateRange as DayPickerDateRange } from 'react-day-picker';

type DatePickerComponentProps = {
  onDateChange: (fromDate: string, toDate: string) => void;
  reset: boolean;
};

export const DatePickerComponent: React.FC<DatePickerComponentProps> = ({ onDateChange, reset }) => {
  const [selected, setSelected] = useState<DayPickerDateRange | undefined>(undefined);

  useEffect(() => {
    if (reset) {
      setSelected(undefined);
      onDateChange("", "");
    }
  }, [reset, onDateChange])

  const handleDateSelect = (range: DayPickerDateRange | undefined) => {
    setSelected(range);
    if (range?.from && range?.to) {
      onDateChange(format(range.from, 'yyyy-MM-dd'), format(range.to, 'yyyy-MM-dd'));
    }
  };

  const today = new Date();

  const isDateDisabled = (date: Date) => {
    return date < today;
  };

  return (
    <Popover>
      <PopoverAction asChild>
        <Button
          color="primary"      
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
          disabled={isDateDisabled}
        />
      </PopoverContent>
    </Popover>
  );
};
