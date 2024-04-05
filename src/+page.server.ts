import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./routes/$types";

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) redirect(302, "/login");
    return {
        username: event.locals.user.username
    };
}