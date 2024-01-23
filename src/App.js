import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./components/form/Login";
import Signup from "./components/form/SignUp";
import Navbar from "./components/Navbar";
import CreateTask from "./components/CreateTask";
import PrivateRoute from "./components/PrivateRoute";
import PageNotFound from "./pages/PageNotFound";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ViewUpdateDeletePage from "./components/ViewUpdateDeletepage";


function App() {

  return (
    <UserAuthContextProvider>
      <Router>
        <Routes>
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Navbar />
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/createTask" element={<CreateTask />} />
          <Route
            path='tasks/:id'
            element={<ViewUpdateDeletePage />}
          />
          <Route
                    path="*"
                    element={<PageNotFound />}
                />
        </Routes>
      </Router>
    </UserAuthContextProvider>
  );
}

export default App;
