import { FC, useEffect, useState } from "react";
import { QuizCard } from "../components/QuizCard/QuizCard";
import useQuizStore from "../store/quizStore";
import { sortFields, sortOrders } from "../const/sort";
import { Selector } from "../components/Select/Select";
import InfiniteScroll from "react-infinite-scroll-component";

export const Home: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    setSortBy,
    setSortOrder,
    getQuizzes,
    quizList,
    totalQuizzes,
    sortBy,
    sortOrder,
  } = useQuizStore();

  const handleSortByChange = (value: string) => {
    setSortBy(value);
  };

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value);
  };

  const hasNextPage = (): boolean => quizList.length < totalQuizzes;

  const nextPage = () => {
    if (!hasNextPage()) return;
    const nextPageCount = currentPage + 1;
    setCurrentPage(nextPageCount);
  };

  useEffect(() => {
    getQuizzes(currentPage);
  }, [getQuizzes, currentPage, sortBy, sortOrder]);

  return (
    <div className="min-h-screen w-full">
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
      <div className="mx-40 m-auto pt-6">
        <InfiniteScroll
          dataLength={quizList.length}
          loader={<p>Loading...</p>}
          hasMore={hasNextPage()}
          next={nextPage}
          className="flex justify-center gap-4 flex-wrap"
        >
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
        </InfiniteScroll>
      </div>
    </div>
  );
};
