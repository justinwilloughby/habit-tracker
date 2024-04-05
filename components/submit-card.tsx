'use client';

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import React from "react";
import { Calendar } from "./ui/calendar";

export const SubmitCard = () => {
  const [date, setDate] = React.useState<Date>(new Date(new Date().setDate(new Date().getDate() - 1)));
  
  return (
    <div className="flex flex-col space-y-2 items-center border shadow-md rounded-md p-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[200px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className={`mr-2 h-4 w-4`} />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(day: Date | undefined) => setDate(day || new Date())}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button variant="default" className="bg-green-500 hover:bg-green-500/90 w-full border-b-4 border-green-700 active:border-b-2">Crushed It</Button>
      <Button variant="destructive" className="w-full border-b-4 border-red-700 active:border-b-2">I Messed Up</Button>
    </div>
  );
}