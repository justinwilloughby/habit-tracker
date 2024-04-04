'use client';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import React, { useCallback } from "react";
import { useAudio } from "react-use";

export default function Home() {

  const days = [
    {
      date: "2024-02-18",
      status: true,
    },
    {
      date: "2024-02-19",
      status: false,
    },
    {
      date: "2024-02-20",
      status: null,
    },
    {
      date: "2024-02-21",
      status: true,
    },
    {
      date: "2024-02-22",
      status: false,
    },
    {
      date: "2024-02-23",
      status: true,
    },
    {
      date: "2024-02-24",
      status: false,
    },
    {
      date: "2024-02-25",
      status: true,
    },
    {
      date: "2024-02-26",
      status: false,
    },
    {
      date: "2024-02-27",
      status: true,
    },
    {
      date: "2024-02-28",
      status: false,
    },
    {
      date: "2024-02-29",
      status: true,
    },
    {
      date: "2024-03-01",
      status: false,
    },
    {
      date: "2024-03-02",
      status: true,
    },
    {
      date: "2024-03-03",
      status: false,
    },
    {
      date: "2024-03-04",
      status: true,
    },
    {
      date: "2024-03-05",
      status: false,
    },
    {
      date: "2024-03-06",
      status: true,
    },
    {
      date: "2024-03-07",
      status: false,
    },
    {
      date: "2024-03-08",
      status: true,
    },
    {
      date: "2024-03-09",
      status: false,
    },
    {
      date: "2024-03-10",
      status: true,
    },
    {
      date: "2024-03-11",
      status: false,
    },
    {
      date: "2024-03-12",
      status: true,
    },
    {
      date: "2024-03-13",
      status: false,
    },
    {
      date: "2024-03-14",
      status: true,
    },
    {
      date: "2024-03-15",
      status: false,
    },
    {
      date: "2024-03-16",
      status: true,
    },
  ];

  // Create function to calculate the day of the week based on date.
  function getDayOfWeek(date: string) {
    const [year, month, day] = date.split('-').map(Number);
    const dayOfWeek = new Date(Date.UTC(year, month, day)).getDay();
    return isNaN(dayOfWeek) ? null : dayOfWeek;
  }

  // Pad the array of objects in the front with blank objects to align the days with the correct day of the week.
  const firstDay = getDayOfWeek(days[0].date);
  if (firstDay != null && firstDay !== 0) {
    for (let i = 0; i < firstDay; i++) {
      days.unshift({
        date: new Date(new Date(days[0].date).setDate(new Date(days[0].date).getDate() - 1)).toISOString().split("T")[0],
        status: null,
      });
    }
  }

  // Create a dictionary of the days I have in my list
  const daysDict = days.reduce((acc: {[key: string]: any}, day) => {
    acc[day.date] = day;
    return acc;
  }, {});

  // Create an array of date objects starting with the first day in the list and ending with today. This can span multiple weeks.
  const startDate = new Date(days[0].date);
  const endDate = new Date();
  const dateArray = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    if (daysDict[currentDate.toISOString().split("T")[0]]) {
      dateArray.push(daysDict[currentDate.toISOString().split("T")[0]]);
    } else {
      dateArray.push({
        date: currentDate.toISOString().split("T")[0],
        status: null,
      });
    }
    currentDate = new Date(currentDate.getTime() + 1000*60*60*24);
  }

  const [date, setDate] = React.useState<Date>(new Date(new Date().setDate(new Date().getDate() - 1)));

  // Find the status of the selected date
  const selectedDateStatus = date && daysDict[format(date, 'yyyy-MM-dd')]?.status;

  // Find the length of the current streak
  let streak = 0;
  for (let i = dateArray.length - 1; i >= 0; i--) {
    if (dateArray[i].status === null) {
      continue;
    }
    else if (dateArray[i].status === true) {
      streak++;
    } else {
      break;
    }
  }

  const successAudioSrc = "./success.wav";
  const failedAudioSrc = "./failed.wav";

  const [successAudio, _S, successControls] = useAudio({ src: successAudioSrc || "" });
  const [failedAudio, _F, failedControls] = useAudio({ src: failedAudioSrc || "" });


  const handleSuccessClick = useCallback(() => {
    successControls.play();
  }, [successControls]);

  const handleFailedClick = useCallback(() => {
    failedControls.play();
  }, [failedControls]);

  return (
    <main className="min-h-full min-w-full flex justify-center items-center bg-white space-x-2">
      <div className="flex flex-col space-y-4">
        <div className="text-4xl mb-4">Hi, Justin</div>
        <div className="flex flex-col lg:flex-row xl:flex-row border rounded-md shadow-md space-y-8 lg:space-x-8 xl:space-x-8 p-4">
          <div className="flex flex-row space-x-2 items-center">
            <Image src="./flame.svg" alt="flame" height="60" width="60" />
            <div className="flex flex-col">
              <div className="text-xl">{streak}</div>
              <div className="text-slate-500">Day Streak</div>
            </div>
          </div>
          <div className="flex flex-col space-y-2 items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[200px] justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className={`mr-2 h-4 w-4 ${selectedDateStatus === true ? 'text-green-500' : selectedDateStatus === false ? 'text-red-500' : ''}`} />
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
            {successAudio}
            {failedAudio}
            <Button onClick={handleSuccessClick} variant="default" className="bg-green-500 hover:bg-green-500/90 w-full border-b-4 border-green-700 active:border-b-2">Crushed It</Button>
            <Button onClick={handleFailedClick} variant="destructive" className="w-full border-b-4 border-red-700 active:border-b-2">I Messed Up</Button>
          </div>
        </div>
        <div className="flex flex-row space-x-2 border rounded-md shadow-md p-4">
          <div className="grid grid-rows-7 gap-1 text-slate-500 text-sm">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>
          <div className="grid grid-rows-7 grid-flow-col gap-1 overflow-auto">
            {/* 
              Track each day in a database and have a status boolean. true, false, null. True is good, false is bad, null is not tracked.
              Get all the days and display them in a grid.
              If the day is true, make it green, if it's false, make it red, if it's null, make it grey.
            */}
            {dateArray.map((day) => {
              return (
                <TooltipProvider key={day.date}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`h-5 w-5 rounded-sm ${
                          day.status === true
                            ? "bg-green-500"
                            : day.status === false
                            ? "bg-red-500"
                            : "bg-gray-500"
                        }`}
                      ></div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{day.date}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>
      </div>
         
    </main>
  );
}
