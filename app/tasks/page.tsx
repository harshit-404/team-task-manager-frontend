"use client";

import { useEffect, useState } from "react";

import api from "../../src/services/api";
import Navbar from "../../src/components/Navbar";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate?: string;

  project: {
    title: string;
  };
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get(
          "/tasks/my-tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);

        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const updateTaskStatus = async (
    taskId: number,
    status: string
  ) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/tasks/${taskId}/status`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, status }
            : task
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center text-black">
          Loading tasks...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-10">
        <h1 className="text-3xl font-bold mb-8 text-black">
          My Tasks
        </h1>

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow text-center text-black">
              No tasks assigned yet
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-6 rounded-lg shadow"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-black">
                    {task.title}
                  </h2>

                  <select
                    value={task.status}
                    onChange={(e) =>
                      updateTaskStatus(
                        task.id,
                        e.target.value
                      )
                    }
                    className="border p-2 rounded text-black"
                  >
                    <option value="TODO">
                      TODO
                    </option>

                    <option value="IN_PROGRESS">
                      IN_PROGRESS
                    </option>

                    <option value="COMPLETED">
                      COMPLETED
                    </option>
                  </select>
                </div>

                <p className="text-gray-700 mt-3">
                  {task.description}
                </p>

                <div className="mt-4 flex gap-4 text-sm flex-wrap">
                  <p className="text-black">
                    Priority: {task.priority}
                  </p>

                  <p className="text-black">
                    Project: {task.project.title}
                  </p>

                  {task.dueDate && (
                    <p className="text-black">
                      Due:{" "}
                      {new Date(
                        task.dueDate
                      ).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}