import { Button, Card, Checkbox, Input } from "antd";
import { FC } from "react";
import { useForm, useFieldArray, Controller, Control } from "react-hook-form";

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Question {
  text: string;
  answers: Answer[];
}

interface QuizForm {
  name: string;
  description: string;
  questions: Question[];
}

export const FormQuiz: FC = () => {
  const { control, handleSubmit } = useForm<QuizForm>({
    defaultValues: {
      name: "",
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

  const onSubmit = (data: QuizForm) => {
    console.log("Quiz Data:", data);
  };

  return (
    <div className="p-6">
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name={"name"}
            control={control}
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

          <Button
            className="mt-4"
            onClick={() =>
              addQuestion({
                text: "",
                answers: [{ text: "", isCorrect: false }],
              })
            }
          >
            Add Question
          </Button>

          <Button className="mt-4" type="primary" htmlType="submit">
            Submit Quiz
          </Button>
        </form>
      </Card>
    </div>
  );
};

interface QuestionAnswersProps {
  control: Control<QuizForm>;
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
