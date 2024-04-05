import { fetchEntries } from "@/lib/data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export const ProgressCard = async () => {
  const entries = await fetchEntries();

  // Create a dictionary of dates so we can easily look up the status of a day.
  const daysDict: { [key: string]: any } = {}; // Add index signature

  entries.forEach((entry) => {
    daysDict[new Date(entry.date).toISOString().split("T")[0]] = entry;
  });

  // Create an array of date objects starting with the first day in the list and ending with today. This can span multiple weeks.
  const startDate = new Date(entries[0].date);
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

  // This is for shifting if your start date is not a Sunday.
  // // Create function to calculate the day of the week based on date.
  // function getDayOfWeek(date: string) {
  //   const [year, month, day] = date.split('-').map(Number);
  //   const dayOfWeek = new Date(Date.UTC(year, month, day)).getDay();
  //   return isNaN(dayOfWeek) ? null : dayOfWeek;
  // }

  // // Pad the array of objects in the front with blank objects to align the days with the correct day of the week.
  // const firstDay = getDayOfWeek(dateArray[0].date);
  // if (firstDay != null && firstDay !== 0) {
  //   for (let i = 0; i < firstDay; i++) {
  //     dateArray.unshift({
  //       date: new Date(new Date(dateArray[0].date).setDate(new Date(dateArray[0].date).getDate() - 1)).toISOString().split("T")[0],
  //       status: null,
  //     });
  //   }
  // }

  return (
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
                    className={`h-5 w-5 rounded-sm ${day.status === 'Success'
                        ? "bg-green-500"
                        : day.status === 'Failed'
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
  );
}