import { Card, Dropdown, MenuProps } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";

interface QuizCardProps {
  title: string;
  description: string;
  id: string;
}

export const QuizCard: FC<QuizCardProps> = ({ description, title, id }) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to={`/run/${id}`}>Run</Link>,
    },
    {
      key: "2",
      label: <Link to={`/run/${id}`}>Edit</Link>,
    },
    {
      key: "3",
      label: (
        <p
          onClick={() => {
            console.log(id);
          }}
        >
          Delete
        </p>
      ),
    },
  ];
  return (
    <Card variant="borderless" className="w-fit h-fit">
      <div className="flex">
        <div className="w-46">
          <p className="text-xl">{title}</p>
          <p>{description}</p>
        </div>
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <div className="rotate-90 cursor-pointer text-lg h-fit">...</div>
          </a>
        </Dropdown>
      </div>
    </Card>
  );
};
