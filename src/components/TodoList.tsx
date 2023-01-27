import { Link } from "react-router-dom";

type Props = {
  name: string;
  id: string;
};

export const TodoList = ({ name, id }: Props) => {
  return (
    <Link to={`${id}`} className="flex py-1 ml-4">
      <p>{name}</p>
    </Link>
  );
};
