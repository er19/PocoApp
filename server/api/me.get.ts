// server/api/me.get.ts
import { auth } from "../db/auth"

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" })
  }
  return { user: session.user }
})