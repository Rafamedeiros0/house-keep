import { formatTaskDate } from "@/app/utils/formatTaskDate";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import type { Owner } from "./user-card";

type Status = "completed" | "inprogress";

type Task = {
  title: string;
  status: Status;
  owner: Owner;
  createdAt: Date;
  completedAt?: Date;
};

type TaskCardProps = {
  task: Task;
  handleDoneTask: (task: Task) => void;
};

const TaskCard = ({ task, handleDoneTask }: TaskCardProps) => {
  return (
    <Card className="w-full" key={task.title}>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>
          <p>{formatTaskDate(task.createdAt)}</p>
          {task.completedAt && (
            <p>{formatTaskDate(task.completedAt, "Completed")}</p>
          )}
        </CardDescription>
        <CardAction>
          {!task.completedAt && (
            <Button
              className="bg-green-500 text-amber-50"
              onClick={() => handleDoneTask(task)}
            >
              DONE
            </Button>
          )}
        </CardAction>
      </CardHeader>
    </Card>
  );
};

export { TaskCard };
export type { Status, Task };
