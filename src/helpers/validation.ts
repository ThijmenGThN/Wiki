import { z } from "zod"

export const vTypes = {
    name: z.string().min(2, { message: "This name is too short" }).max(32, { message: "This name is too long" }),
    email: z.string().min(2, { message: "This email address is too short" }).max(64, { message: "This email address is too long" }).email("This email address is not valid"),
    password: z.string().min(8, { message: "This password is too short" }).max(64, { message: "This password is too long" })
}

const validators = {

    objects: {

        name: z.object({ name: vTypes.name }),
        email: z.object({ email: vTypes.email }),

        user: z.object({
            name: vTypes.name,
            email: vTypes.email,
            password: vTypes.password
        }),

        mail: z.object({
            to: z.string().min(4).max(64).email(),
            subject: z.string().min(1).max(64)
        })

    },

    forms: {

        register: z.object({
            name: vTypes.name,
            password: vTypes.password,
            repeatPassword: vTypes.password
        }).refine(({ password, repeatPassword }) => password == repeatPassword, { message: "The passwords do not match", path: ['repeatPassword'] }),

        login: z.object({
            email: vTypes.email,
            password: vTypes.password
        }),

        password: z.object({
            password: vTypes.password,
            repeatPassword: vTypes.password
        }).refine(({ password, repeatPassword }) => password == repeatPassword, { message: "The passwords do not match", path: ['repeatPassword'] })

    }
}

export default validators
