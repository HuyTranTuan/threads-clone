import PropTypes from "prop-types";
import { Link } from "react-router";
import { ThreadsFillIcon } from "./ui/icons/akar-icons-threads-fill";

export default function Logo({ path }) {
  return (
    <Link
      className="w-full! h-full! flex justify-center items-center"
      to={path}
    >
      <ThreadsFillIcon className="w-full h-full scale-95 stroke-0 fill-(--normaltext)! transform mx-auto my-auto" />
    </Link>
  );
}

Logo.propTypes = {
  path: PropTypes.string,
};
