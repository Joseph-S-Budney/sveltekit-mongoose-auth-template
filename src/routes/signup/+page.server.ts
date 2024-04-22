import { lucia } from "$lib/utils/auth";
import { fail, redirect } from "@sveltejs/kit";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { User } from "$lib/models/UserModel";

import type { Actions } from "./$types";

export const actions: Actions = {
    default: async (event) => {
        const formData = await event.request.formData();
        const username = formData.get("username");
        const password = formData.get("password");

        // validates form data
        if (
            typeof username !== "string" ||
            username.length < 3 ||
            username.length > 31 ||
            !/^[a-zA-Z0-9_-]+$/.test(username)
        ) { 
            return fail(400, {
                message: "Invalid username"
            });
        }
        if (typeof password !== "string" || password.length < 6 || password.length > 255) {
            return fail(400, {
                message: "Invalid password"
            });
        }

        // generates hashed password
        const userId = generateId(15);
        const hashedPassword = await new Argon2id().hash(password);
        // checks if username is in the db
        if (await(User.exists({username: username})) != null ){
            return fail(400, {
                message: "username is not unique"
            })
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
        redirect(302, "/")
    }
}