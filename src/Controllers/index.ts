import { z } from "zod"
import { Controllers } from "./singleton"
import { NextResponse } from "next/server"
import { prisma } from "@/services/prisma"
import { revalidatePath } from "next/cache"

export const createUser = Controllers.append(
  "/user",
  z.object({ username: z.string(), email: z.string().email() }),
  function (req, { email, username }) {
    const user = {
      id: Math.random(),
      email,
      username,
    }
    return NextResponse.json({ userId: user.id })
  },
  "POST"
)

export { Controllers }

export const createTodo = Controllers.append(
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
  },
  "POST"
)

export const toggleTodo = Controllers.append(
  "/todo",
  z.object({ todoId: z.string(), checked: z.boolean() }),
  async (req, { todoId, checked }) => {
    const todo = await prisma.todo.update({
      where: { id: todoId },
      data: {
        is_done: checked,
      },
    })

    return NextResponse.json(todo)
  },
  "PUT"
)

export const deleteTodo = Controllers.append(
  "/todo",
  z.object({ todoId: z.string() }),
  async (req, { todoId }) => {
    await prisma.todo.delete({
      where: { id: todoId },
    })

    return NextResponse.json({ code: "SUCCESS" })
  },
  "DELETE"
)

export const getTodos = Controllers.append(
  "/todos",
  z.null(),
  async (req, input) => {
    const todos = await prisma.todo.findMany()

    return NextResponse.json(todos)
  },
  "GET"
)
