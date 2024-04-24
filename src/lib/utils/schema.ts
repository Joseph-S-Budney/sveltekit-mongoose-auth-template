import { z } from "zod";

export const signupForm = z.object({
    username: z
        .string()
        .min(2)
        .max(50)
        .regex(/^[A-Za-z0-9-_]+$/, "invalid character"),
    password: z
        .string()
        .min(6)
        .max(255),
    confirm_password: z
        .string()
})
.refine(({ password, confirm_password }) => password === confirm_password, {
    message: "Password doesn't match",
    path: ["confirm_password"]
});

export const signinForm = z.object({
    username: z
        .string()
        .min(2)
        .max(50)
        .regex(/^[A-Za-z0-9-_]+$/, "invalid character"),
    password: z
        .string()
        .min(6)
        .max(255)
})

export type SignupSchema = typeof signupForm;
export type SigninSchema = typeof signinForm;