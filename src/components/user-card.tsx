import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Owner = "rafael" | "isabel";

type UserCardProps = {
  owner: Owner;
  pendingTasks: number;
  completedTasks: number;
  handleNewTask: (owner: Owner) => void;
};

const UserCard = ({
  owner,
  pendingTasks,
  completedTasks,
  handleNewTask,
}: UserCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{owner}</CardTitle>
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
        <p>Pending Tasks: {pendingTasks}</p>
        <p>Completed Tasks:{completedTasks}</p>
      </CardContent>
    </Card>
  );
};

export { UserCard };
export type { Owner };
