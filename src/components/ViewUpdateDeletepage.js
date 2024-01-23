import { child, get, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../fire";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";

export default function ViewUpdateDeletePage() {
  const params = useParams();

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
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getTaskDetails = () => {
    get(child(ref(db), `tasks/${params.id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const data = snapshot.val();
          setFormData(data);
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
    getTaskDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    set(ref(db, `tasks/${params.id}`), formData);
    window.alert("Updated Details");
  };

  const handleDelete = (e) => {
    remove(ref(db, "tasks/" + params.id));
    console.log("Deleted Task");
  };
  return (
   

    <div className="container mx-auto p-4">
  <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
    <div className="mb-6">
      <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
        Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        className="w-full border p-2 rounded"
        onChange={handleChange}
        value={formData.title}
      />
    </div>

    <div className="mb-6">
      <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        rows={6}
        className="w-full border p-2 rounded"
        onChange={handleChange}
        value={formData.description}
      ></textarea>
    </div>

    <div className="flex">
      <div className="mb-6 flex-1 me-3">
        <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">
          Status
        </label>
        <select
          id="status"
          name="status"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          value={formData.status}
        >
          <option>Select Status</option>
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="mb-6 flex-1 me-3">
        <label htmlFor="assigned_user" className="block text-gray-700 text-sm font-bold mb-2">
          Assigned User
        </label>
        <select
          id="assigned_user"
          name="assigned_user"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          value={formData.assigned_user}
        >
          <option>Select User</option>
          {usersList.map((item) => (
            <option key={item.id} value={item.id}>
              {`${item.username} <${item.email}>`}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6 flex-1">
        <label htmlFor="deadline" className="block text-gray-700 text-sm font-bold mb-2">
          Deadline
        </label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          className="w-full border p-2 rounded"
          min={new Date().toISOString().split("T")[0]}
          onChange={handleChange}
          value={formData.deadline}
        />
      </div>
    </div>

    <div className="flex mt-6">
      <button  className="btn btn-outline-danger mx-3">
        Update Task
      </button>
      <button className="btn btn-outline-danger mx-3" onClick={handleDelete}>
        Delete Task
      </button>
    </div>
  </form>
</div>

  );
}
