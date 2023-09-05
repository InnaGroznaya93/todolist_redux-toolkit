import { FC } from "react";
import { FilterValuesType, TodolistDomainType, todolistsActions } from "../todolists.reducer";
import React from "react";
import { Button } from "@mui/material";
import { useActions } from "common/hooks";

type Props = {
  todolist: TodolistDomainType;
};

export const FilterTasksButtons: FC<Props> = ({ todolist }) => {
  const { changeTodolistFilter } = useActions(todolistsActions);

  const changeFilterHadler = (filter: FilterValuesType) => {
    changeTodolistFilter({ filter, id: todolist.id });
  };

  return (
    <div>
      <Button variant={todolist.filter === "all" ? "outlined" : "text"} onClick={() => changeFilterHadler('all')} color={"inherit"}>
        All
      </Button>
      <Button
        variant={todolist.filter === "active" ? "outlined" : "text"}
        onClick={() => changeFilterHadler('active')}
        color={"primary"}
      >
        Active
      </Button>
      <Button
        variant={todolist.filter === "completed" ? "outlined" : "text"}
        onClick={() => changeFilterHadler('completed')}
        color={"secondary"}
      >
        Completed
      </Button>
    </div>
  );
};
