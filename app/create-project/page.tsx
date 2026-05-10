"use client";

import { useState } from "react";

import api from "../../src/services/api";
import Navbar from "../../src/components/Navbar";

export default function CreateProjectPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
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
        "/projects",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project created successfully");

      setFormData({
        title: "",
        description: "",
      });
    } catch (error) {
      console.log(error);

      alert("Failed to create project");
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
            Create Project
          </h1>

          <input
            type="text"
            name="title"
            placeholder="Project title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4 text-black"
          />

          <input
            type="text"
            name="description"
            placeholder="Project description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-6 text-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded"
          >
            Create Project
          </button>
        </form>
      </div>
    </>
  );
}