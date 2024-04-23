import { lucia } from "$lib/utils/auth";
import { fail, redirect } from "@sveltejs/kit";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { User } from "$lib/models/UserModel";
import { superValidate } from 'sveltekit-superforms';
import { userForm } from '$lib/utils/Schema';
import { zod } from "sveltekit-superforms/adapters";

import type { Actions } from "./$types";

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(userForm));
        if (!form.valid){
            return fail(400, {
                form,
            });
        }
        const formData = await event.request.formData();
        const username = formData.get("username")
        const password: string | null = formData.get("password")
        
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
        return {
            form,
        };
    }
}