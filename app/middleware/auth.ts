export default defineNuxtRouteMiddleware(async (to) => {
  const { getSession } = useAuth()
  const { data: session } = await getSession()

  if (!session?.user) {
    return navigateTo({ path: "/login", query: { redirect: to.fullPath } })
  }
})
