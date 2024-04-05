import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async (event: { locals: { user: { username: any; }; }; }) => {
    if (!event.locals.user) redirect(302, "/login");
    return {
        username: event.locals.user.username
    };
}