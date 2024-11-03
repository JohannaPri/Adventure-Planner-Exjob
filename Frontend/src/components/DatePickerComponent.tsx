'use client'
import { format } from 'date-fns'
import { Calendar } from '@phosphor-icons/react'
import { useState } from 'react'
import { Button, DatePicker, Popover, PopoverAction, PopoverContent } from 'keep-react'
import { DateRange as DayPickerDateRange } from 'react-day-picker';



export const DatePickerComponent = () => {
    const [selected, setSelected] = useState<DayPickerDateRange | undefined>();
  return (
    <Popover>
      <PopoverAction asChild>
        <Button color="secondary"
          size="lg"
          className="border border-slateGray bg-white text-slateGray rounded-lg lg:w-[300px] w-full h-[50px] p-2 flex items-center justify-start hover:bg-white hover:text-slateGray"
          variant="outline">
          <Calendar size={20} className="mr-1 text-slate-500" />
          <div className="font-normal text-slate-500">
          {selected ? (
            <>
              {format(selected?.from ?? new Date(), 'LLL dd, y')} - {format(selected?.to ?? new Date(), 'LLL dd, y')}
            </>
          ) : (
            <span className="font-normal text-slate-500">Select Your Date</span>
          )}
          </div>
        </Button>
      </PopoverAction>
      <PopoverContent align="start" className="border-0 max-w-min">
        <DatePicker mode="range" numberOfMonths={2} selected={selected} onSelect={setSelected} showOutsideDays={true} />
      </PopoverContent>
    </Popover>
  )
}