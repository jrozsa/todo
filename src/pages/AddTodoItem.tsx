import { SubmitHandler, useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";
import { useCreateTodoItem } from "../api/todoApi";
import { useParams } from "react-router-dom";
import { Input, Textarea } from "react-daisyui";

const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string(),
    dueDate: yup.date(),
  })
  .required();

type Inputs = {
  title: string;
  description: string;
  dueDate: string;
};

export const AddTodoItem = () => {
  const { id: selectedTodoListId } = useParams();
  const { mutate: createTodoItem } = useCreateTodoItem(selectedTodoListId);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => createTodoItem(data);

  return (
    <div className="flex flex-1 flex-col justify-center items-center gap-2">
      <h1 className="text-center">Add new todo item</h1>
      <form onSubmit={handleSubmit(onSubmit)} id="addTodoListForm">
        <div className="flex flex-col flex-1 gap-2">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                placeholder="Name"
                className={`${_.isEmpty(errors.title) ? "" : "input-error"}`}
                {...field}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                placeholder="Description"
                className={`${
                  _.isEmpty(errors.description) ? "" : "input-error"
                }`}
                {...field}
              />
            )}
          />
          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <Input
                type="datetime-local"
                className={`${_.isEmpty(errors.dueDate) ? "" : "input-error"}`}
                {...field}
              />
            )}
          />
        </div>
      </form>
      <button className="btn" form="addTodoListForm" value="Submit">
        Submit
      </button>
    </div>
  );
};
