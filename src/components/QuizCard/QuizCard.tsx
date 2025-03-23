import { Card, Dropdown, MenuProps } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import useQuizStore from "../../store/quizStore";

interface QuizCardProps {
  title: string;
  description: string;
  id: string;
  count: number;
  questionAmount: number;
}

export const QuizCard: FC<QuizCardProps> = ({
  description,
  title,
  id,
  count,
  questionAmount,
}) => {
  const removeQuiz = useQuizStore((store) => store.removeQuiz);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to={`/run/${id}`}>Run</Link>,
    },
    {
      key: "2",
      label: <p onClick={() => removeQuiz(id)}>Delete</p>,
    },
  ];
  return (
    <Card variant="borderless" className="w-fit h-fit">
      <div className="flex">
        <div className="w-46">
          <p className="text-xl">{title}</p>
          <p>{description}</p>
          <div className="mt-2">
            <p>
              Amount of completions: <strong>{count}</strong>
            </p>
            <p>
              Amount of question: <strong>{questionAmount}</strong>
            </p>
          </div>
        </div>
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()} className="h-6">
            <p className="rotate-90 cursor-pointer text-lg h-fit">...</p>
          </a>
        </Dropdown>
      </div>
    </Card>
  );
};
