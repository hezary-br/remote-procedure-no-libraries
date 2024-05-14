import { Controllers } from "../rpc/singleton" // !! Precisa vir da pasta das RPC
import {
  extractZodErrors,
  getEndpoint,
  makeKey,
  mapRequestToControllerHandler,
} from "../rpc/helpers"
import { NextRequest, NextResponse } from "next/server"

export function createMutationEndpoint() {
  return async function (req: NextRequest) {
    const endpoint = getEndpoint(req.url!)
    const controller = Controllers.getController(makeKey(req.method, endpoint))
    if (!controller) {
      console.log("Controllers: ", Controllers.items.keys())
      return new Response(null, { status: 405 })
    }
    const body = await req.json()
    const validation = controller.zodValidator.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(extractZodErrors(validation.error), {
        status: 400,
      })
    }
    return controller.handle(
      mapRequestToControllerHandler(req),
      validation.data
    )
  }
}

export function createQueryEndpoint() {
  return async function (req: NextRequest) {
    const endpoint = getEndpoint(req.url!)
    const controller = Controllers.getController(makeKey(req.method, endpoint))
    if (!controller) {
      console.log("Controllers: ", Controllers.items.keys())
      return new Response(null, { status: 405 })
    }
    return controller.handle(mapRequestToControllerHandler(req), undefined)
  }
}
