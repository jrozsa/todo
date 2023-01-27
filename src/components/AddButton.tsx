import { Button } from "react-daisyui";
import { Link } from "react-router-dom";

type Props = {
  linkTo: string;
};

export const AddButton = ({ linkTo }: Props) => {
  return (
    <Link to={linkTo}>
      <Button shape="circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6  rotate-45"
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
    </Link>
  );
};
