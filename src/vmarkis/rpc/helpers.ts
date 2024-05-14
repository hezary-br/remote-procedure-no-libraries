import { HandlerRequest } from "./types"
import { NextRequest } from "next/server"
import { z } from "zod"

export function mapRequestToControllerHandler(
  req: NextRequest
): HandlerRequest {
  return {
    cookies: req.cookies,
    headers: req.headers,
  }
}

export function makeKey(method: string, endpoint: string) {
  return `${method}-${endpoint}`
}

export function getEndpoint(url: string) {
  const { pathname } = new URL(url)
  const [, endpoint] = pathname.split("/api")
  return endpoint
}

export function extractZodErrors(errors: z.ZodError) {
  return errors.issues.map(i => ({
    message: i.message,
    paths: i.path.map(p => String(p)),
  }))
}

export function stringify(object: Record<string, any>) {
  return JSON.stringify(object)
}
