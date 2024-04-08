import { fetchCurrentStreak } from '@/lib/data';
import Image from 'next/image';

export const StreakCard = async () => {

  const streak = await fetchCurrentStreak();

  return (
    <div className="flex flex-row space-x-2 items-center border shadow-md rounded-md p-4">
      <Image src="./flame.svg" alt="flame" height="60" width="60" />
      <div className="flex flex-col">
        <div className="text-xl">{streak ? streak.streak_length : 0}</div>
        <div className="text-slate-500">Day Streak</div>
      </div>
    </div>
  );
}