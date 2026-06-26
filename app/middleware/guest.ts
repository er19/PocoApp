// middleware/guest.ts — bounce logged-in users off the landing/login page
export default defineNuxtRouteMiddleware(async () => {
  const { getSession } = useAuth()
  const { data: session } = await getSession()
  if (session?.user) {
    return navigateTo("/app")
  }
})
