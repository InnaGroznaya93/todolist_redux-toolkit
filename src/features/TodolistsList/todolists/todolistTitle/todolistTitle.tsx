import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { EditableSpan } from "common/components";
import React, { FC, useCallback } from "react";
import { TodolistDomainType, todolistsThunks } from "../todolists.reducer";
import { useActions } from "common/hooks";

type Props = {
  todolist: TodolistDomainType;
};

export const TodolistTitle: FC<Props> = (props) => {
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

  const removeTodolistHandler = () => {
    removeTodolist(props.todolist.id);
  };

  const changeTodolistTitleHandler = useCallback(
    (title: string) => {
      changeTodolistTitle({ id: props.todolist.id, title });
    },
    [props.todolist.id],
  );

  return (
    <h3>
      <EditableSpan value={props.todolist.title} onChange={changeTodolistTitleHandler} />
      <IconButton onClick={removeTodolistHandler} disabled={props.todolist.entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  );
};
