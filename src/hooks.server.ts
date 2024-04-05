import type { Handle } from "@sveltejs/kit";
import { lucia } from "$lib/utils/auth";
import { db } from "$lib/utils/db";

await db().then(() => {
    console.log("connected to database")
})

export const handle: Handle = async ({ event, resolve }) => {
    const sessionId = event.cookies.get(lucia.sessionCookieName);
    if ( !sessionId ){
        event.locals.user = null;
        event.locals.session = null;
        return resolve(event)
    }
    const { session, user } = await lucia.validateSession(sessionId);
    if ( session && session.fresh ) {
        const sessionCookie = lucia.createSessionCookie(sessionId);
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });
    }
    if(!session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });
    }
    event.locals.user = user;
    event.locals.session = session;
    const response = await resolve(event);
    return response;
}
