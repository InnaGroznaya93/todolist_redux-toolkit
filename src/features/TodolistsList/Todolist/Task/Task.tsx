import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { TaskType } from "features/TodolistsList/todolists/todolists.api";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import { tasksThunks } from "features/TodolistsList/tasks/tasks.reducer";
import { useActions } from "common/hooks";

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
};

export const Task = React.memo((props: TaskPropsType) => {

const {removeTask, updateTask} = useActions(tasksThunks)

  const removeTaskHandler = useCallback(
    () => removeTask({taskId: props.task.id, todolistId: props.todolistId}),
    [props.task.id, props.todolistId],
  );

  const changeStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked;
      let status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
      updateTask(
       { taskId: props.task.id,
        domainModel: {status},
        todolistId: props.todolistId,}
      );
    },
    [props.task.id, props.todolistId],
  );

  const changeTitleHandler = useCallback(
    (title: string) => {
      updateTask({taskId: props.task.id, domainModel: {title}, todolistId: props.todolistId});
    },
    [props.task.id, props.todolistId],
  );

  return (
    <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
      <Checkbox checked={props.task.status === TaskStatuses.Completed} color="primary" onChange={changeStatusHandler} />

      <EditableSpan value={props.task.title} onChange={changeTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
