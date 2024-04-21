import { lucia } from '$lib/utils/auth';
import { User } from '$lib/models/User';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

// is signed in
export const load: PageServerLoad = async ( event ) => {
    if (!event.locals.user)redirect(302, "/signin")
    //return username
    return {
        username: event.locals.user.username
    }
}

// signout
export const actions: Actions = {
    default: async (event) => {
        if (!event.locals.session) {
            return fail(401);
        }
        await lucia.invalidateSession(event.locals.session.id);
        const sessionCookie = lucia.createBlankSessionCookie();
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });
        redirect(302, "/signin");
    }
}