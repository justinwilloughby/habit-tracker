'use client';

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import React from "react";
import { Calendar } from "./ui/calendar";
import { upsertEntry } from "@/lib/actions";
import { useAudio } from "react-use";

export const SubmitCard = () => {
  const [date, setDate] = React.useState<Date>(new Date(new Date().setDate(new Date().getDate() - 1)));

  const successAudioSrc = "./success.wav";
  const failedAudioSrc = "./failed.wav";

  const [successAudio, _S, successControls] = useAudio({ src: successAudioSrc || "" });
  const [failedAudio, _F, failedControls] = useAudio({ src: failedAudioSrc || "" });

  const submitSuccess = async () => {
    await upsertEntry(date, "Success");
    successControls.play();
    setDate(new Date(new Date(date).setDate(date.getDate() + 1)));
  }

  const submitFailed = async () => {
    await upsertEntry(date, "Failed");
    failedControls.play();
    setDate(new Date(new Date(date).setDate(date.getDate() + 1)));
  }
  
  return (
    <div className="flex flex-col space-y-2 items-center border shadow-md rounded-md p-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full min-w-[200px] justify-start text-left font-normal",
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
      <Button onClick={submitSuccess} variant="default" className="bg-green-500 hover:bg-green-500/90 w-full border-b-4 border-green-700 active:border-b-2">Succeeded</Button>
      {successAudio}
      <Button onClick={submitFailed} variant="destructive" className="w-full border-b-4 border-red-700 active:border-b-2">Failed</Button>
      {failedAudio}
    </div>
  );
}