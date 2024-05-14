import { z } from "zod"
import { Controllers } from "./singleton"
import { NextResponse } from "next/server"
import { prisma } from "@/services/prisma"

export const createUser = Controllers.post(
  "/user",
  z.object({
    username: z.string(),
    email: z.string().email(),
  }),
  function (req, { email, username }) {
    const user = {
      id: Math.random(),
      email,
      username,
    }
    return NextResponse.json({ userId: user.id })
  }
)

export const createTodo = Controllers.post(
  "/todo",
  z.object({
    title: z.string().min(1, "Preencha o titulo."),
    text: z.string().min(1, "Preencha o texto."),
    is_done: z.coerce.boolean(),
  }),
  async (req, input) => {
    const todo = await prisma.todo.create({
      data: {
        is_done: input.is_done,
        text: input.text,
        title: input.title,
      },
    })

    return NextResponse.json(todo)
  }
)

export const toggleTodo = Controllers.put(
  "/todo",
  z.object({
    todoId: z.string(),
    checked: z.boolean(),
  }),
  async (req, { todoId, checked }) => {
    const todo = await prisma.todo.update({
      where: { id: todoId },
      data: {
        is_done: checked,
      },
    })

    return NextResponse.json(todo)
  }
)

export const deleteTodo = Controllers.delete(
  "/todo",
  z.object({
    todoId: z.string(),
  }),
  async (_, { todoId }) => {
    await prisma.todo.delete({
      where: { id: todoId },
    })

    return NextResponse.json({ code: "SUCCESS" })
  }
)

export const getTodos = Controllers.get(
  "/todos",
  z.null(),
  async (req, input) => {
    const todos = await prisma.todo.findMany()

    return NextResponse.json(todos)
  }
)

export { Controllers }
