import { lucia } from '$lib/utils/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '$lib/utils/schema';
import { zod } from "sveltekit-superforms/adapters";

// is signed in
export const load: PageServerLoad = async ( event ) => {
    if (!event.locals.user)redirect(302, "/signin")
    //return username
    return {
        username: event.locals.user.username,
        form: await superValidate(zod(formSchema))
    }
}

// signout
export const actions: Actions = {
    form: async (event) => {
        const form = await superValidate(event, zod(formSchema));
        if (!form.valid){
            return fail(400, {
                form,
            });
        }
        return {
            form,
        };
    },
}