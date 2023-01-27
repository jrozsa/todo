import { SubmitHandler, useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";
import { useCreateTodoList } from "../api/todoApi";
import { Button, Input } from "react-daisyui";

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

type Inputs = {
  name: string;
};

export const AddTodoList = () => {
  const { mutate: createPost } = useCreateTodoList();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => createPost(data.name);

  console.log(_.isEmpty(errors));

  return (
    <div className="flex flex-1 flex-col justify-center items-center gap-2">
      <h1 className="text-center">Add new todo list</h1>
      <form onSubmit={handleSubmit(onSubmit)} id="addTodoListForm">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Type here"
              className={`input input-borderedinput input-bordered w-full max-w-xs ${
                _.isEmpty(errors) || "input-error"
              }`}
              {...field}
            />
          )}
        />
      </form>
      <Button form="addTodoListForm" value="Submit">
        Submit
      </Button>
    </div>
  );
};
