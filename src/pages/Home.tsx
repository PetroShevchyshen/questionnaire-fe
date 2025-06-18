import { FC, useEffect } from "react";
import { QuizCard } from "../components/QuizCard/QuizCard";
import useQuizStore from "../store/quizStore";
import { sortFields, sortOrders } from "../const/sort";
import { Selector } from "../components/Select/Select";

export const Home: FC = () => {
  const { setSortBy, setSortOrder, getQuizzes, quizList } = useQuizStore();

  const handleSortByChange = (value: string) => {
    setSortBy(value);
    getQuizzes();
  };

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value);
    getQuizzes();
  };

  useEffect(() => {
    getQuizzes();
  }, [getQuizzes]);

  return (
    <div className="h-screen w-full">
      <div className="p-4 flex gap-4 justify-end">
        <Selector
          data={sortFields}
          placeholder="Select sort field"
          label="Sorting by: "
          onChange={handleSortByChange}
        />
        <Selector
          data={sortOrders}
          placeholder="Select sort order"
          label="Ordering by: "
          onChange={handleSortOrderChange}
        />
      </div>
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
