import { FC, useEffect } from "react";
import { QuizCard } from "../components/QuizCard/QuizCard";
import useQuizStore from "../store/quizStore";

export const Home: FC = () => {
  const getQuizzes = useQuizStore((store) => store.getQuizzes);
  const quizList = useQuizStore((store) => store.quizList);

  useEffect(() => {
    getQuizzes();
  }, [getQuizzes]);

  return (
    <div className="h-screen w-full">
      <div className="mx-20 m-auto pt-6 flex justify-center gap-4 flex-wrap">
        {quizList.map((quiz) => (
          <QuizCard
            key={quiz._id}
            title={quiz.title}
            description={quiz.description}
            count={quiz.count}
            questionAmount={quiz.questions.length}
            id={quiz._id}
          />
        ))}
      </div>
    </div>
  );
};
