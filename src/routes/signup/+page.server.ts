import { lucia } from "$lib/utils/auth";
import { redirect } from "@sveltejs/kit";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { User } from "$lib/models/UserModel";
import { superValidate, fail, setError } from 'sveltekit-superforms';
import { signupForm } from '$lib/utils/Schema';
import { zod } from "sveltekit-superforms/adapters";

import type { Actions } from "./$types";

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(signupForm));
        if (!form.valid){
            return fail(400, {
                form,
            });
        }
        const username = form.data.username
        const password = form.data.password

        // generates hashed password
        const userId = generateId(15);
        const hashedPassword = await new Argon2id().hash(password);
        // checks if username is in the db
        if (await(User.exists({username: username})) != null ){
            return setError(form, "username", "username is not unique");
        }

        // adds the user to the database
        User.create({
            _id: userId,
            username: username,
            hashed_password: hashedPassword
        });

        //creates session and cookie
        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });
        redirect(302, "/signin")
    }
}