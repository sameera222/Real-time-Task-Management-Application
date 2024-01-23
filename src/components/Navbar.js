import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";

export default function Navbar() {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
   
    <div>
      <nav className="bg-gray-800 border-b border-gray-900 max-w-full sm:px-16 py-2 mx-auto flex flex-wrap justify-between items-center">
        <div className="container mx-auto p-4 flex flex-wrap justify-between items-center">
          <Link to={"/home"} className="text-white text-2xl font-bold">
            Task Management
          </Link>

          <div className="text-white sm:hidden">{user && user.email}</div>

          <div className="">
            <button
              className="w-24 sm:w-28 rounded py-2 px-4 text-center sm:flex sm:flex-col sm:justify-center sm:items-center h-8 text-md"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
