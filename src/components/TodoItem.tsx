import { Button, Input } from "react-daisyui";
import { useParams } from "react-router-dom";
import {
  TodoItem as TodoItemType,
  useDeleteTodoItem,
  useUpdateTodoItem,
} from "../api/todoApi";

type Props = TodoItemType;

export const TodoItem = ({
  title,
  description,
  dueDate,
  isDone,
  id,
}: Props) => {
  const { id: todoListId } = useParams();
  const { mutate: deleteTodoItem } = useDeleteTodoItem(todoListId);
  const { mutate: updateTodoItem } = useUpdateTodoItem(todoListId);

  const date = new Date(dueDate).toLocaleDateString();
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center gap-2">
          <Input
            type="checkbox"
            className="toggle toggle-xs toggle-success"
            checked={isDone}
            onChange={() => updateTodoItem({ isDone: !isDone, id })}
          />
          <h2 className="card-title">{title}</h2>
          <div className="tooltip ml-auto" data-tip="Delete">
            <Button
              className="btn btn-square btn-xs"
              onClick={() => deleteTodoItem({ todoItemId: id })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
        </div>
        <p>{date}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};
