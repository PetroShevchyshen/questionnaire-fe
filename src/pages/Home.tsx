import { FC } from "react";
import { QuizCard } from "../components/QuizCard/QuizCard";

export const Home: FC = () => {
  return (
    <div className="h-screen w-full ">
      <div className="mx-20 m-auto pt-6 flex justify-center gap-4 flex-wrap">
        <QuizCard title="Test" description="description" id="1" />
      </div>
    </div>
  );
};
