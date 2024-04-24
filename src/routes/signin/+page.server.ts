import { lucia } from "$lib/utils/auth";
import { redirect } from "@sveltejs/kit";
import { Argon2id } from "oslo/password";
import { User } from "$lib/models/UserModel";
import { superValidate, fail, setError } from 'sveltekit-superforms';
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
        
        // checks if user is in db
        const existingUser = await User.findOne({username: username});
        if(!existingUser){
            return setError(form, "username", "username does not exist");           
        }
        // checks hashed password
        const validPassword = await new Argon2id().verify(existingUser.get('hashed_password'), password);
        if (!validPassword){
            return setError(form, "password", "Incorrect password");
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