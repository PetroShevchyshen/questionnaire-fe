import { Button, Card, Checkbox, Input } from "antd";
import { FC } from "react";
import { useForm, useFieldArray, Controller, Control } from "react-hook-form";
import useQuizStore from "../../store/quizStore";
import { QuizRequest } from "../../contracts/QuizRequest";
import { useNavigate } from "react-router-dom";

export const FormQuiz: FC = () => {
  const createQuiz = useQuizStore((store) => store.createQuiz);
  const navigate = useNavigate();
  const { control, handleSubmit, formState } = useForm<QuizRequest>({
    defaultValues: {
      title: "",
      description: "",
      questions: [{ text: "", answers: [{ text: "", isCorrect: false }] }],
    },
  });

  const {
    fields: questions,
    append: addQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = async (data: QuizRequest) => {
    const v = await createQuiz(data);
    if (v.success) navigate("/");
  };

  return (
    <div className="p-6">
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name={"title"}
            control={control}
            rules={{ required: "required" }}
            render={({ field }) => (
              <div>
                <label>Name of Quiz</label>
                <Input {...field} placeholder="Enter quiz name" />
              </div>
            )}
          />

          <Controller
            name={"description"}
            control={control}
            rules={{ required: "required" }}
            render={({ field }) => (
              <div>
                <label>Description</label>
                <Input {...field} placeholder="Enter description" />
              </div>
            )}
          />

          <div className="mt-4 flex flex-col gap-2">
            {questions.map((question, qIndex) => (
              <Card key={question.id} className="">
                <Controller
                  name={`questions.${qIndex}.text`}
                  control={control}
                  rules={{ required: "required" }}
                  render={({ field }) => (
                    <div>
                      <label>Question</label>
                      <Input {...field} placeholder="Enter question" />
                    </div>
                  )}
                />

                <div>
                  <label>Answers</label>
                  <div className="flex flex-col gap-3">
                    <QuestionAnswers control={control} questionIndex={qIndex} />
                  </div>
                </div>

                <Button
                  danger
                  className="mt-2"
                  onClick={() => removeQuestion(qIndex)}
                >
                  Remove Question
                </Button>
              </Card>
            ))}
          </div>

          <div className="mt-4 flex gap-4">
            <Button
              onClick={() =>
                addQuestion({
                  text: "",
                  answers: [{ text: "", isCorrect: false }],
                })
              }
            >
              Add Question
            </Button>

            <Button
              variant="solid"
              color="green"
              htmlType="submit"
              disabled={!formState.isValid}
            >
              Submit Quiz
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

interface QuestionAnswersProps {
  control: Control<QuizRequest>;
  questionIndex: number;
}

const QuestionAnswers: FC<QuestionAnswersProps> = ({
  control,
  questionIndex,
}) => {
  const {
    fields: answers,
    append: addAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.answers`,
  });

  return (
    <>
      {answers.map((answer, aIndex) => (
        <div key={answer.id} className="flex items-center gap-2">
          <Controller
            name={`questions.${questionIndex}.answers.${aIndex}.text`}
            control={control}
            rules={{ required: "required" }}
            render={({ field }) => (
              <Input {...field} placeholder="Enter answer" />
            )}
          />
          <Controller
            name={`questions.${questionIndex}.answers.${aIndex}.isCorrect`}
            control={control}
            render={({ field }) => (
              <Checkbox {...field} checked={field.value}>
                Correct
              </Checkbox>
            )}
          />
          <Button danger onClick={() => removeAnswer(aIndex)}>
            X
          </Button>
        </div>
      ))}
      <Button
        className="mt-2"
        onClick={() => addAnswer({ text: "", isCorrect: false })}
      >
        Add Answer
      </Button>
    </>
  );
};
