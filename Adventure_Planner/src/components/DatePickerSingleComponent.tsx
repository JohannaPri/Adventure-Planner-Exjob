import { format } from 'date-fns';
import { Calendar } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import { Button, DatePicker, Popover, PopoverAction, PopoverContent } from 'keep-react';
import { DateRange as DayPickerDateRange } from 'react-day-picker';

type DatePickerSingleComponentProps = {
  onDateChange: (selectDate: string) => void;
  reset: boolean;
};

export const DatePickerSingleComponent: React.FC<DatePickerSingleComponentProps> = ({ onDateChange, reset }) => {
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (reset) {
      setSelected(undefined);
      onDateChange("");
    }
  }, [reset, onDateChange])

  const handleDateSelect = (date: Date | undefined) => {
    setSelected(date);
    if (date) {
      onDateChange(format(date, 'yyyy-MM-dd'));
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
                format(selected, 'LLL dd, y')
            ) : (
              <span className="font-normal text-slate-500">Select Your Date</span>
            )}
          </div>
        </Button>
      </PopoverAction>
      <PopoverContent align="start" className="border-0 max-w-min">
        <DatePicker
          mode="single"
          selected={selected}
          onSelect={handleDateSelect}
          showOutsideDays={true}
          disabled={isDateDisabled}
        />
      </PopoverContent>
    </Popover>
  );
};