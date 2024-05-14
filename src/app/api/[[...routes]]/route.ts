import {
  createMutationEndpoint,
  createQueryEndpoint,
} from "@/vmarkis/rpc-adapters/app"

export const POST = createMutationEndpoint()
export const PUT = createMutationEndpoint()
export const DELETE = createMutationEndpoint()
export const PATCH = createMutationEndpoint()
export const GET = createQueryEndpoint()
