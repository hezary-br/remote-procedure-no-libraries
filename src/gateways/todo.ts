import { prisma } from "@/services/prisma"

export const getTodoList = async () => {
  return await prisma.todo.findMany()
}
