import { Container } from "@mui/material"
import { TodolistsList } from "features/todolists-list/todolists-list"
import React from "react"
import { Routes, Route } from "react-router-dom"
import { Login } from "features/auth/ui/login/login";

export const Routing = () => {
    return <Container fixed>
    <Routes>
      <Route path={"/"} element={<TodolistsList />} />
      <Route path={"/login"} element={<Login />} />
    </Routes>
  </Container>
}