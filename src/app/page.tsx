"use client";

import { useState } from "react";
import { type Status, type Task, TaskCard } from "@/components/task-card";
import { type Owner, UserCard } from "@/components/user-card";
import { getItem, getLenth, removeItem } from "@/database";

const randomInt = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleNewTask = (owner: Owner) => {
    const indexNewTask = randomInt(0, getLenth() - 1);
    const newTask = {
      title: getItem(indexNewTask),
      owner,
      status: "inprogress" as Status,
      createdAt: new Date(),
    };

    setTasks([...tasks, newTask]);
    removeItem(newTask.title);
  };

  const handleDoneTask = (task: Task) => {
    const doneTask = {
      ...task,
      status: "completed" as Status,
      completedAt: new Date(),
    };

    setTasks([
      doneTask,
      ...tasks.filter((prevTask) => prevTask.title !== task.title),
    ]);
  };

  const countTasks = (owner: Owner, status: Status) =>
    tasks.filter((task) => task.owner === owner && task.status === status)
      .length;

  return (
    <div className="grid grid-cols-2 m-12 gap-12 ">
      <div className="space-y-6">
        <UserCard
          owner="isabel"
          handleNewTask={() => handleNewTask("isabel")}
          completedTasks={countTasks("isabel", "completed")}
          pendingTasks={countTasks("isabel", "inprogress")}
        />

        {tasks
          .filter(
            (task) => task.owner === "isabel" && task.status === "inprogress",
          )
          .map((task) => (
            <TaskCard
              task={task}
              handleDoneTask={() => handleDoneTask(task)}
              key={task.title}
            />
          ))}

        {tasks
          .filter(
            (task) => task.owner === "isabel" && task.status === "completed",
          )
          .map((task) => (
            <TaskCard
              task={task}
              handleDoneTask={() => handleDoneTask(task)}
              key={task.title}
            />
          ))}
      </div>
      <div className="space-y-6">
        <UserCard
          owner="rafael"
          handleNewTask={() => handleNewTask("rafael")}
          completedTasks={countTasks("rafael", "completed")}
          pendingTasks={countTasks("rafael", "inprogress")}
        />

        {tasks
          .filter(
            (task) => task.owner === "rafael" && task.status === "inprogress",
          )
          .map((task) => (
            <TaskCard
              task={task}
              handleDoneTask={() => handleDoneTask(task)}
              key={task.title}
            />
          ))}

        {tasks
          .filter(
            (task) => task.owner === "rafael" && task.status === "completed",
          )
          .map((task) => (
            <TaskCard
              task={task}
              handleDoneTask={() => handleDoneTask(task)}
              key={task.title}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
