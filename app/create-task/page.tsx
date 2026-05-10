"use client";

import { useEffect, useState } from "react";

import api from "../../src/services/api";
import Navbar from "../../src/components/Navbar";

interface User {
  id: number;
  name: string;
}

interface Project {
  id: number;
  title: string;
}

export default function CreateTaskPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    assignedToId: "",
    projectId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const usersResponse = await api.get(
          "/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const projectsResponse = await api.get(
          "/projects",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(usersResponse.data);
        setProjects(projectsResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/tasks",
        {
          ...formData,
          assignedToId: Number(
            formData.assignedToId
          ),
          projectId: Number(
            formData.projectId
          ),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task created successfully");

      setFormData({
        title: "",
        description: "",
        priority: "MEDIUM",
        assignedToId: "",
        projectId: "",
      });
    } catch (error) {
      console.log(error);

      alert("Failed to create task");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-[500px]"
        >
          <h1 className="text-2xl font-bold mb-6 text-black">
            Create Task
          </h1>

          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4 text-black"
          />

          <input
            type="text"
            name="description"
            placeholder="Task description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4 text-black"
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4 text-black"
          >
            <option value="LOW">
              LOW
            </option>

            <option value="MEDIUM">
              MEDIUM
            </option>

            <option value="HIGH">
              HIGH
            </option>
          </select>

          <select
            name="assignedToId"
            value={formData.assignedToId}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4 text-black"
          >
            <option value="">
              Select User
            </option>

            {users.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          <select
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-6 text-black"
          >
            <option value="">
              Select Project
            </option>

            {projects.map((project) => (
              <option
                key={project.id}
                value={project.id}
              >
                {project.title}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded"
          >
            Create Task
          </button>
        </form>
      </div>
    </>
  );
}