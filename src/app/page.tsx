"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getItem, getLenth, removeItem } from "@/database";
import { useState } from "react";

const randomInt = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

type Owner = "rafael" | "isabel";

type Task = {
  title: string;
  createdAt: Date;
  owner: Owner;
};

type TaskDone = {
  title: string;
  createdAt: Date;
  completedAt: Date;
  owner: Owner;
};

const formatTaskDate = (date = new Date(), action = "Created") => {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  if (isToday) return `${action} today at ${time}`;
  if (isYesterday) return `${action} yesterday at ${time}`;

  const datePart = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return `${action} on ${datePart} at ${time}`;
};

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<TaskDone[]>([]);

  const handleNewTask = (owner: Owner) => {
    const indexNewTask = randomInt(0, getLenth() - 1);
    const newTask = {
      title: getItem(indexNewTask),
      createdAt: new Date(),
      owner,
    };

    setTasks([...tasks, newTask]);
    removeItem(newTask.title);
  };

  const handleDoneTask = (task: Task) => {
    const notCompletedTasks = tasks.filter(
      (notCompletedTask) => notCompletedTask.title !== task.title,
    );
    setTasks(notCompletedTasks);

    const doneTask = { ...task, completedAt: new Date() };

    setDoneTasks([doneTask, ...doneTasks]);
  };

  return (
    <>
      <div className="grid grid-cols-2 m-12 gap-12 ">
        <div className="space-y-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Isabel</CardTitle>
              <CardAction>
                <Button
                  onClick={() => {
                    handleNewTask("isabel");
                  }}
                >
                  Get New Task
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p>
                Pending Tasks:
                {tasks.filter((tasks) => tasks.owner === "isabel").length}
              </p>
              <p>
                Completed Tasks:
                {
                  doneTasks.filter((doneTask) => doneTask.owner === "isabel")
                    .length
                }
              </p>
            </CardContent>
          </Card>

          {tasks
            .filter((task) => task.owner === "isabel")
            .map((task) => (
              <Card className="w-full" key={task.title}>
                <CardHeader>
                  <CardTitle>{task.title}</CardTitle>
                  <CardDescription>
                    {formatTaskDate(task.createdAt)}
                  </CardDescription>
                  <CardAction>
                    <Button
                      className="bg-green-500 text-amber-50"
                      onClick={() => handleDoneTask(task)}
                    >
                      DONE
                    </Button>
                  </CardAction>
                </CardHeader>
              </Card>
            ))}

          {doneTasks
            .filter((doneTask) => doneTask.owner === "isabel")
            .map((doneTask) => (
              <Card className="w-full" key={doneTask.title}>
                <CardHeader>
                  <CardTitle>{doneTask.title}</CardTitle>
                  <CardDescription>
                    {formatTaskDate(doneTask.completedAt, "Completed")}
                  </CardDescription>
                  <CardAction></CardAction>
                </CardHeader>
              </Card>
            ))}
        </div>
        <div className="space-y-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Rafael</CardTitle>
              <CardDescription>Rafael Description</CardDescription>
              <CardAction>
                <Button
                  onClick={() => {
                    handleNewTask("rafael");
                  }}
                >
                  DONE
                </Button>
              </CardAction>
            </CardHeader>
          </Card>

          {tasks
            .filter((task) => task.owner === "rafael")
            .map((task) => (
              <Card className="w-full" key={task.title}>
                <CardHeader>
                  <CardTitle>{task.title}</CardTitle>
                  <CardDescription>
                    {formatTaskDate(task.createdAt)}
                  </CardDescription>
                  <CardAction>
                    <Button
                      className="bg-green-500 text-amber-50"
                      onClick={() => handleDoneTask(task)}
                    >
                      DONE
                    </Button>
                  </CardAction>
                </CardHeader>
              </Card>
            ))}

          {doneTasks
            .filter((doneTask) => doneTask.owner === "rafael")
            .map((doneTask) => (
              <Card className="w-full" key={doneTask.title}>
                <CardHeader>
                  <CardTitle>{doneTask.title}</CardTitle>
                  <CardDescription>
                    {formatTaskDate(doneTask.completedAt, "Completed")}
                  </CardDescription>
                  <CardAction></CardAction>
                </CardHeader>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
