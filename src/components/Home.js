import { Link } from "react-router-dom";
import TaskCard from "./TaskCard";
import { child, get, ref } from "firebase/database";
import { db } from "../fire";
import { useEffect, useState } from "react";
import ViewUpdateDeletepage from "./ViewUpdateDeletepage";

export default function Home() {
  const [tasksList, setTasksList] = useState({
    todo: {},
    in_progress: {},
    done: {},
  });

  const getTasksList = () => {
    get(child(ref(db), `tasks`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val(), "value of home");
          const data = snapshot.val();
          const filtered_data = {
            todo: {},
            in_progress: {},
            done: {},
          };
          Object.keys(data).forEach((key) => {
            const item = data[key];
            filtered_data[item["status"]][key] = item;
          });
          console.log(filtered_data, "filtered_data");
          setTasksList(filtered_data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getTasksList();
  }, []);

  return (
    <main className="container mx-auto my-8">
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0 mx-3">
          <div className="bg-yellow-400 text-black px-3 py-2 rounded">TODO</div>
          <div className="mt-2">
            {Object.keys(tasksList["todo"]).map((key) => (
              <TaskCard
                key={key}
                props={{ ...tasksList["todo"][key], ["key"]: key }}
              />
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0 mx-3">
          <div className="bg-red-400 text-black px-3 py-2 rounded">
            In Progress
          </div>
          <div className="mt-2">
            {Object.keys(tasksList["in_progress"]).map((key) => (
              <TaskCard
                key={key}
                props={{ ...tasksList["in_progress"][key], ["key"]: key }}
              />
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0 mx-3">
          <div className="bg-pink-800 text-black px-3 py-2 rounded">Done</div>
          <div className="mt-2">
            {Object.keys(tasksList["done"]).map((key) => (
              <TaskCard
                key={key}
                props={{ ...tasksList["done"][key], ["key"]: key }}
              />
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0 mx-3">
          <div className="bg-orange-300 text-black px-3 py-2 rounded">
            <Link to="/createTask" className="btn btn-dark rounded">
              Add new task +
            </Link>
          </div>
        </div>

        
      </div>
    </main>
  );
}
