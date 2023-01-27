import { useState } from "react";
import { Input, Select } from "react-daisyui";
import { useParams } from "react-router-dom";
import { useGetTodoItemsInList } from "../api/todoApi";
import { AddButton } from "../components/AddButton";
import { TodoItem } from "../components/TodoItem";

enum Filter {
  ALL = "ALL",
  ACTIVE = "ACTIVE",
  DONE = "DONE",
}

export const TodoLists = () => {
  const { id: selectedTodoListId } = useParams();
  const { data: todoListItems } = useGetTodoItemsInList(selectedTodoListId);
  const [filter, setFilter] = useState(Filter.ALL);
  const [searchText, setSearchText] = useState("");

  const filteredTodoListItems = todoListItems?.filter((item) => {
    switch (filter) {
      case Filter.ACTIVE:
        return !item.isDone;
      case Filter.DONE:
        return item.isDone;
      default:
        return true;
    }
  });

  const searchedTodoListItems = filteredTodoListItems?.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchText) ||
      item.description.toLowerCase().includes(searchText) ||
      new Date(item.dueDate)
        .toLocaleDateString()
        .toLowerCase()
        .includes(searchText)
    );
  });

  const todoListItemComponents = searchedTodoListItems?.map((item) => (
    <TodoItem key={`${selectedTodoListId}-${item.id}`} {...item} />
  ));

  return (
    <div className="relative flex flex-1 flex-col">
      <div className="flex gap-2 m-2">
        <Select
          value={filter}
          onChange={(event) => setFilter(event.target.value as Filter)}
        >
          <option value={Filter.ALL}>All</option>
          <option value={Filter.ACTIVE}>Active</option>
          <option value={Filter.DONE}>Done</option>
        </Select>
        <Input
          value={searchText}
          onChange={(event) => setSearchText(event.target.value.toLowerCase())}
        />
      </div>
      <div className="flex flex-wrap justify-evenly items-stretch gap-1 p-2 overflow-y-auto">
        {todoListItemComponents}
      </div>
      <div className="fixed right-6 bottom-2">
        <AddButton linkTo={`./addItem`} />
      </div>
    </div>
  );
};
