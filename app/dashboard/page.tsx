"use client";

import { useEffect, useState } from "react";

import api from "../../src/services/api";
import Navbar from "../../src/components/Navbar";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-10">
        <h1 className="text-3xl font-bold mb-8 text-black">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-black">
              Total Tasks
            </h2>

            <p className="text-3xl mt-4 text-black">
              {stats.totalTasks}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-black">
              Completed Tasks
            </h2>

            <p className="text-3xl mt-4 text-black">
              {stats.completedTasks}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-black">
              Pending Tasks
            </h2>

            <p className="text-3xl mt-4 text-black">
              {stats.pendingTasks}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-black">
              Overdue Tasks
            </h2>

            <p className="text-3xl mt-4 text-black">
              {stats.overdueTasks}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}