import { FC } from "react";
import { TaskType } from "../todolists.api";
import { TodolistDomainType } from "../todolists.reducer";
import React from "react";
import { TaskStatuses } from "common/enums";
import { Task } from "features/TodolistsList/Todolist/Task/Task";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Tasks: FC<Props> = (props) => {
  let tasksForTodolist = props.tasks;

  if (props.todolist.filter === "active") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (props.todolist.filter === "completed") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      {tasksForTodolist.map((t) => (
        <Task key={t.id} task={t} todolistId={props.todolist.id} />
      ))}
    </div>
  );
};
