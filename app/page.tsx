import { ProgressCard } from "@/components/progress-card";
import { StreakCard } from "@/components/streak-card";
import { SubmitCard } from "@/components/submit-card";

export default function Home() {
  return (
    <main className="min-h-full min-w-full flex justify-center items-center bg-white space-x-2">
      <div className="flex flex-col space-y-4">
        <div className="text-4xl mb-4">Hi, Justin</div>
        <div className="flex flex-col lg:flex-row xl:flex-row space-y-4 lg:space-y-0 xl:space-y-0 lg:space-x-4 xl:space-x-4">
          <StreakCard />
          <SubmitCard />
        </div>
        <ProgressCard />
      </div>
    </main>
  );
}
