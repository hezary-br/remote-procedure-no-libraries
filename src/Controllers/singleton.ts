import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

type Endpoint = string
type Controller = {
  endpoint: string
  zodValidator: z.ZodSchema<any>
  handle(req: NextRequest, input: unknown): Promise<NextResponse> | NextResponse
}

export class Controllers {
  static items = new Map<Endpoint, Controller>()

  // static get<TResult, TInput>(
  //   endpoint: string,
  //   zodValidator: z.ZodSchema<any>,
  //   handle: (req: NextRequest, input: TInput) => NextResponse<TResult>
  // ) {
  //   return this.append(endpoint, zodValidator, handle, "GET");
  // }

  // static post<TResult, TInput>(
  //   endpoint: string,
  //   zodValidator: z.ZodSchema<any>,
  //   handle: (req: NextRequest, input: TInput) => NextResponse<TResult>
  // ) {
  //   return this.append(endpoint, zodValidator, handle, "POST");
  // }

  static append<TResult, TInput = any>(
    endpoint: string,
    zodValidator: z.ZodSchema<TInput>,
    handle: (
      req: NextRequest,
      input: TInput
    ) => Promise<NextResponse<TResult>> | NextResponse<TResult>,
    method: "GET" | "POST" | "PUT" | "DELETE"
  ) {
    this.items.set(`${method}-${endpoint}`, { endpoint, handle, zodValidator })

    function shouldHaveBody(method: string) {
      return !z.enum(["GET", "HEAD"]).safeParse(method.toUpperCase()).success
    }

    const rpc = async (input: TInput) => {
      const res = await fetch(`http://localhost:3000/api${endpoint}`, {
        method,
        body: shouldHaveBody(method) ? JSON.stringify(input) : undefined,
      })

      if (!res.ok) console.log("ERROR", res)

      return res.ok ? (res.json() as TResult) : ({} as TResult)
    }
    rpc.validator = zodValidator
    return rpc
  }

  static getController(endpoint: string) {
    return this.items.get(endpoint)
  }
}

export const register = <TResult, TInput = any>(
  ...args: [
    endpoint: string,
    zodValidator: z.ZodSchema<TInput>,
    handle: (
      req: NextRequest,
      input: TInput
    ) => Promise<NextResponse<TResult>> | NextResponse<TResult>,
    method: "GET" | "POST"
  ]
) => {
  console.log("!!> Appended controller", ...args)
  return Controllers.append<TResult, TInput>(...args)
}
