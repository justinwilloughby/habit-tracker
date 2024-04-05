import Image from 'next/image';

export const StreakCard = () => {

  const streak = 5;

  return (
    <div className="flex flex-row space-x-2 items-center border shadow-md rounded-md p-4">
      <Image src="./flame.svg" alt="flame" height="60" width="60" />
      <div className="flex flex-col">
        <div className="text-xl">{streak}</div>
        <div className="text-slate-500">Day Streak</div>
      </div>
    </div>
  );
}