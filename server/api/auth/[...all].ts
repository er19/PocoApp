import { auth } from "../../db/auth"; // path to your auth file

export default defineEventHandler((event) => {
    return auth.handler(toWebRequest(event));
});