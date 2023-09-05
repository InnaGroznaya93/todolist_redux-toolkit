import React, { useCallback, useEffect } from "react";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Task } from "./Task/Task";
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/todolists/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/tasks/tasks.reducer";
import { TaskType } from "features/TodolistsList/todolists/todolists.api";
import { TaskStatuses } from "common/enums";
import { useActions } from "common/hooks";
import { AddItemForm, EditableSpan } from "common/components";
import { FilterTasksButtons } from "../todolists/filterTasksButtons/filterTasksButtons";
import { Tasks } from "../todolists/tasks/tasks";
import { TodolistTitle } from "../todolists/todolistTitle/todolistTitle";

type PropsType = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist = React.memo(function (props: PropsType) {
  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(props.todolist.id);
  }, []);

  const addTaskHandler = useCallback(
    (title: string) => {
      return addTask({ title, todolistId: props.todolist.id }).unwrap();
    },
    [props.todolist.id],
  );

  return (
    <div>
      <TodolistTitle todolist={props.todolist}/>

      <AddItemForm addItem={addTaskHandler} disabled={props.todolist.entityStatus === "loading"} />

      <Tasks tasks={props.tasks} todolist={props.todolist} />

      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={props.todolist} />
      </div>
    </div>
  );
});
