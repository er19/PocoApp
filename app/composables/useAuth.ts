import { createAuthClient } from "better-auth/vue"

export function useAuth() {
  const url = useRequestURL()
  const headers = import.meta.server ? useRequestHeaders(["cookie"]) : undefined
  const client = createAuthClient({
    baseURL: url.origin,
    fetchOptions: { headers },
  })

  // Resolve the current session. Awaitable everywhere (SSR + client),
  // unlike the reactive `client.useSession`.
  const getSession = () => client.getSession()

  const signInWithGoogle = () =>
    client.signIn.social({ provider: "google", callbackURL: "/app" })

  const signOut = async () => {
    await client.signOut()
    await navigateTo("/login")
  }

  return { client, getSession, signInWithGoogle, signOut }
}
