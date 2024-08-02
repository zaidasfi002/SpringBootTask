import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800  h-20 w-full flex align-middle justify-between text-white">
      <div className="text-3xl p-4">Logo</div>
      <div className="flex   gap-5 texl-2xl p-4">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};
export default Navbar;
