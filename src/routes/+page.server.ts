import { lucia } from '$lib/utils/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { signinForm } from '$lib/utils/Schema';
import { signupForm } from '$lib/utils/Schema';
import { zod } from "sveltekit-superforms/adapters";

// is signed in
export const load: PageServerLoad = async ( event ) => {
    if (!event.locals.user)redirect(302, "/signin")
    //return username
    return {
        username: event.locals.user.username,
        signinform: await superValidate(zod(signinForm)),
        signupform: await superValidate(zod(signupForm))
    }
}

// signout
export const actions: Actions = {
    signout: async (event) => {
        if (!event.locals.session) {
            return fail(401);
        }
        // destroys session and cookie
        await lucia.invalidateSession(event.locals.session.id);
        const sessionCookie = lucia.createBlankSessionCookie();
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });
        redirect(302, "/signin");
    },
}