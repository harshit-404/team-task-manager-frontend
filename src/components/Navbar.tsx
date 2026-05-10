"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  name: string;
  role: string;
}

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(
    null
  );

  useEffect(() => {
    const storedUser = localStorage.getItem(
      "user"
    );

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        Team Task Manager
      </h1>

      <div className="flex gap-6 items-center">
        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/tasks">
          Tasks
        </Link>

        <Link href="/create-project">
          Create Project
        </Link>

        <Link href="/create-task">
          Create Task
        </Link>

        {user && (
          <div className="text-sm">
            {user.name} ({user.role})
          </div>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}