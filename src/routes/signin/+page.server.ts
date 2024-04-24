import { lucia } from "$lib/utils/auth";
import { fail, redirect } from "@sveltejs/kit";
import { Argon2id } from "oslo/password";
import { User } from "$lib/models/UserModel";
import { superValidate } from 'sveltekit-superforms';
import { signinForm } from '$lib/utils/Schema';
import { zod } from "sveltekit-superforms/adapters";

import type { Actions } from "./$types";

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(signinForm));
        if (!form.valid){
            return fail(400, {
                form,
            });
        }

        const username = form.data.username
        const password = form.data.password
        
        console.log('user exists')
        // checks if user is in db
        const existingUser = await User.findOne({username: username});
        if(!existingUser){
            return fail(400, {
                message: "Incorrect username or password"
            });           
        }
        // checks hashed password
        const validPassword = await new Argon2id().verify(existingUser.get('hashed_password'), password);
        if (!validPassword){
            return fail(400, {
                message: "Incorrect username or password"
            });
        }

        //creates session and cookie
        const session = await lucia.createSession(existingUser.get('_id'), {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });
        redirect(302, "/")
    }
}