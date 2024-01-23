import { useEffect, useState } from "react";
import { child, get, ref, set } from "firebase/database";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

export default function CreateTask() {
  const [usersList, setUsersList] = useState([]);
  const [formData, setFormData] = useState({
    title: null,
    description: null,
    status: null,
    assigned_user: null,
    deadline: null,
  });

  const getUserList = () => {
    get(child(ref(db), `users`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const data = snapshot.val();
          setUsersList(Object.values(data));
          console.log(data, "data is here");
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getUserList();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData, "formData");
    const taskId = uuidv4();
    set(ref(db, "tasks/" + taskId), formData);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white rounded p-6 shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="exampleInputTitle1"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            id="exampleInputTitle1"
            name="title"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="exampleInputDescription"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <textarea
            className="w-full border border-gray-300 p-2 rounded"
            id="exampleInputDescription1"
            rows={6}
            name="description"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label
              htmlFor="status"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Status
            </label>
            <select
              name="status"
              className="w-full border border-gray-300 p-2 rounded"
              onChange={handleChange}
            >
              <option>Select Status</option>
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="flex-1">
            <label
              htmlFor="assigned_user"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Assigned User
            </label>
            <select
              name="assigned_user"
              className="w-full border border-gray-300 p-2 rounded"
              onChange={handleChange}
            >
              <option>Select User</option>
              {usersList.map((item) => (
                <option key={item.id} value={item.id}>
                  {`${item.username} <${item.email}>`}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label
              htmlFor="deadline"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Deadline
            </label>
            <input
              onChange={handleChange}
              type="date"
              className="w-full border border-gray-300 p-2 rounded"
              name="deadline"
              id="deadline"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition duration-300"
        >
          Create New Task
        </button>
      </form>
    </div>
  );
}
