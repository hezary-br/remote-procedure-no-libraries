import { Controllers } from "@/Controllers"
import { NextRequest, NextResponse } from "next/server"

export const POST = async function (
  req: NextRequest,
  { params }: { params: unknown }
) {
  const { pathname } = new URL(req.url!)
  const [, endpoint] = pathname.split("/api")
  const controller = Controllers.getController(`${req.method}-${endpoint}`)
  if (!controller) {
    console.log("Controllers: ", Controllers.items.keys())
    return new Response(null, { status: 404 })
  }
  const body = await req.json()
  const validation = controller.zodValidator.safeParse(body)
  if (!validation.success) {
    console.log("POST", validation.error)
    return new NextResponse(null, { status: 400 })
  }
  return controller.handle(req, validation.data)
}

export const PUT = async function (
  req: NextRequest,
  { params }: { params: unknown }
) {
  const { pathname } = new URL(req.url!)
  const [, endpoint] = pathname.split("/api")
  const controller = Controllers.getController(`${req.method}-${endpoint}`)
  if (!controller) {
    console.log("Controllers: ", Controllers.items.keys())
    return new Response(null, { status: 404 })
  }
  const body = await req.json()
  const validation = controller.zodValidator.safeParse(body)
  if (!validation.success) {
    console.log("PUT", validation.error)
    return new NextResponse(null, { status: 400 })
  }
  return controller.handle(req, validation.data)
}

export const DELETE = async function (
  req: NextRequest,
  { params }: { params: unknown }
) {
  const { pathname } = new URL(req.url!)
  const [, endpoint] = pathname.split("/api")
  const controller = Controllers.getController(`${req.method}-${endpoint}`)
  if (!controller) {
    console.log("Controllers: ", Controllers.items.keys())
    return new Response(null, { status: 404 })
  }
  const body = await req.json()
  const validation = controller.zodValidator.safeParse(body)
  if (!validation.success) {
    console.log("DELETE", validation.error)
    return new NextResponse(null, { status: 400 })
  }
  return controller.handle(req, validation.data)
}

export const PATCH = async function (
  req: NextRequest,
  { params }: { params: unknown }
) {
  const { pathname } = new URL(req.url!)
  const [, endpoint] = pathname.split("/api")
  const controller = Controllers.getController(`${req.method}-${endpoint}`)
  if (!controller) {
    console.log("Controllers: ", Controllers.items.keys())
    return new Response(null, { status: 404 })
  }
  const body = await req.json()
  const validation = controller.zodValidator.safeParse(body)
  if (!validation.success) {
    console.log("PATCH", validation.error)
    return new NextResponse(null, { status: 400 })
  }
  return controller.handle(req, validation.data)
}

export async function GET(req: NextRequest, { params }: { params: unknown }) {
  const { pathname } = new URL(req.url!)
  const [, endpoint] = pathname.split("/api")
  const controller = Controllers.getController(`${req.method}-${endpoint}`)
  if (!controller) {
    console.log("Controllers: ", Controllers.items.keys())
    return new Response(null, { status: 404 })
  }
  return controller.handle(req, undefined)
}
