import { Outlet } from "react-router-dom";
import { useGetTodoLists } from "./api/todoApi";
import { AddButton } from "./components/AddButton";
import { Header } from "./components/Header";
import { TodoList } from "./components/TodoList";

function App() {
  const { data: todoLists } = useGetTodoLists();

  if (!todoLists) {
    return null;
  }

  const todoListComponents = todoLists.map((todoList) => (
    <TodoList key={todoList.id} id={todoList.id} name={todoList.name} />
  ));

  return (
    <div className="flex flex-col absolute inset-0 bg-base-200">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="relative w-1/4 h-full pt-2 bg-base-100 overflow-y-auto">
          {todoListComponents}
          <div className="fixed left-6 bottom-2">
            <AddButton linkTo="./add" />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
