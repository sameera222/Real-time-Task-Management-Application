
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
      <nav className="bg-gray-800 border-b border-gray-900">
        <div className="container mx-auto p-4 flex flex-row justify-between items-center">
          <Link to={"/home"} className="text-white text-2xl font-bold">
            Task Management
          </Link>
          <div className="text-white">
          
            {user && user.email }
     
          </div>
         
          <div className="">
            <button
              className="w-28 flex justify-center items-center h-8"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
