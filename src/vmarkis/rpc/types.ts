import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies"
import { NextResponse } from "next/server"
import { z } from "zod"

export type Endpoint = string
export type Controller = {
  endpoint: string
  zodValidator: z.ZodSchema<any>
  handle(
    req: HandlerRequest,
    input: unknown
  ): Promise<NextResponse> | NextResponse
}

export type HandlerRequest = {
  cookies: RequestCookies
  headers: Headers
}

export type ResponseLike<TResult> = Omit<Response, "json"> & {
  json(): Promise<TResult>
}

export type RequestFetchConfig = Omit<RequestInit, "body" | "method">
