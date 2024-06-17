import { Header } from "@/components/header";
import { ProgressCard } from "@/components/progress-card";
import { StreakCard } from "@/components/streak-card";
import { SubmitCard } from "@/components/submit-card";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-full w-full flex justify-center items-center bg-white">
      <div className="w-full max-w-xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between text-4xl mb-8"><Header /><UserButton /></div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StreakCard />
          <SubmitCard />
        </div>
        <div className="mt-4">
          <ProgressCard />
        </div>
      </div>
    </main>
  );
}