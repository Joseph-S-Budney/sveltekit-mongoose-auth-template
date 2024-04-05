import { lucia } from '$lib/utils/auth';
import { User } from '$lib/models/User';
import { fail, redirect } from '@sveltejs/kit';
 import type { Actions, PageServerLoad } from './$types';

 export const load: PageServerLoad = async ({ locals }) => {
    if(!locals.session){
        redirect(307, "/signin")
    }
 }

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