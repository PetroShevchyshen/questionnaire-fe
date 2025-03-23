import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useQuizStore from "../store/quizStore";
import { Button, Card, Checkbox } from "antd";
import { useForm, Controller } from "react-hook-form";
import { ModalWindow } from "../components/Modal/ModalWindow";
import { Timer } from "../components/Timer/Timer";
import { useTimerStore } from "../store/timeStore";

interface QuizFormData {
  answers: {
    [questionId: string]: {
      [answerId: string]: boolean;
    };
  };
}

export const RunQuiz: FC = () => {
  const { id } = useParams();
  const getQuiz = useQuizStore((store) => store.getQuiz);
  const sendAnswer = useQuizStore((store) => store.sendAnswer);
  const quiz = useQuizStore((store) => store.quiz);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStoppedTimer, setIsStoppedTimer] = useState(false);
  const finalTime = useTimerStore((store) => store.finalTime);
  const [score, setScore] = useState(0);

  const questions = quiz?.questions;

  const { handleSubmit, control } = useForm<QuizFormData>();

  const prepareQuizSubmission = (data: QuizFormData) => {
    const formattedAnswers = Object.entries(data.answers).flatMap(
      ([questionID, answerObj]) =>
        Object.entries(answerObj)
          .filter(([_, isSelected]) => isSelected)
          .map(([selectedAnswerId]) => ({
            questionID,
            selectedAnswerId,
          }))
    );
    const answers = { quiz: id, answers: formattedAnswers, score: score };
    return answers;
  };

  const onSubmit = (data: QuizFormData) => {
    checkScore(data);
    const save = prepareQuizSubmission(data);
    setIsModalOpen((prev) => !prev);
    setIsStoppedTimer(true);
    sendAnswer(save);
  };

  const checkScore = (data: QuizFormData) => {
    if (!quiz || !quiz.questions) return;

    quiz.questions.forEach((question) => {
      const userAnswers = data.answers[question._id] || {};
      const correctAnswers = question.answers.filter((a) => a.isCorrect);

      const userSelectedIds = Object.keys(userAnswers).filter(
        (id) => userAnswers[id]
      );
      const correctIds = correctAnswers.map((a) => a._id);

      const isCorrect =
        userSelectedIds.length === correctIds.length &&
        userSelectedIds.every((id) => correctIds.includes(id));

      if (isCorrect) {
        setScore((prev) => prev + 1);
      }
    });
  };

  const goToHome = () => navigate("/");

  useEffect(() => {
    if (id) {
      getQuiz(id);
    }
  }, [getQuiz, id]);

  return (
    <div className="p-6">
      <Card>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col items-center">
            <label className="text-xl">Name of Quiz</label>
            <p>{quiz?.title}</p>
          </div>
          <div>
            <label className="text-lg">Description</label>
            <p>{quiz?.description}</p>
            <Timer stoppedTimer={isStoppedTimer} />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4 flex flex-col gap-2">
            {questions?.map((question) => (
              <Card key={question._id}>
                <div>
                  <label className="font-bold">{question.text}</label>
                </div>
                {question.answers.map((answer) => (
                  <Controller
                    key={answer._id}
                    name={`answers.${question._id}.${answer._id}`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value || false}>
                        {answer.text}
                      </Checkbox>
                    )}
                  />
                ))}
              </Card>
            ))}
          </div>
          <div className="mt-4 flex gap-4">
            <Button onClick={goToHome}>Cancel</Button>
            <Button variant="solid" color="green" htmlType="submit">
              Submit Quiz
            </Button>
          </div>
        </form>
      </Card>
      <ModalWindow
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        time={finalTime ?? ""}
        okHandle={goToHome}
        score={score}
        total={quiz?.questions.length ?? 0}
      />
    </div>
  );
};
