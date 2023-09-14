"use client"

import { signIn } from "next-auth/react"
import { useTransition } from "react"

import validate from '@/helpers/validation'

import * as actions from "@/server/auth/register"

import Form from '@/components/Form'

const callbackUrl = '/dashboard'

export default function Component({ email }: { email: string }) {
    const [isPending, startTransition] = useTransition()

    const onSubmit = ({ name, password }: any) => new Promise<void>(async (resolve, throwError) => {
        startTransition(async () => {
            await actions.create({ name, email, password })
            signIn('credentials', { email, password, callbackUrl })
        })
    })

    return (
        <Form
            onSubmit={onSubmit}
            submit={{ label: "Sign up", position: 'full' }}
            validator={validate.forms.register}
            fields={[
                { id: 'name', type: 'text', label: 'Name' },
                { id: 'password', type: 'password', label: 'Password' },
                { id: 'repeatPassword', type: 'password', label: 'Repeat password' }
            ]}
            options={[
                "showPassword"
            ]}
        />
    )
}
