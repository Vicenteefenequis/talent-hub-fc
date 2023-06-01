
"use client";
import LoadingDots from '@/components/LoadingDots';
import { Field, Form, Formik, FormikProps, useFormik, withFormik } from 'formik';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-hot-toast';


type Values = {
    email: string;
    password: string;
}



const LoginForm: React.FC = () => {
    const router = useRouter()

    const initialValues: Values = {
        email: '',
        password: ''
    }

    return (
        <Formik initialValues={initialValues} onSubmit={(values, actions) => {
            signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password,
            }).then((response) => {
                if (response?.error) {
                    toast.error(response.error)
                } else {
                    toast.success("Logged in!")
                    router.refresh()
                    router.push("/")
                }
            }).catch(error => {
                toast.error(error)
            })
            actions.setSubmitting(false)
        }}>
            {({ isSubmitting }) => (
                <Form className='flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16'>
                    <label className="block text-xs text-gray-600 uppercase" htmlFor="firstName">Email</label>
                    <Field
                        id="email"
                        name="email"
                        placeholder="E-mail"
                        className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                    />
                    <label className="block text-xs text-gray-600 uppercase" htmlFor="firstName">Password</label>
                    <Field
                        id="password"
                        name="password"
                        placeholder="Password"
                        className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`${isSubmitting
                            ? "cursor-not-allowed border-gray-200 bg-gray-100"
                            : "border-black bg-black text-white hover:bg-white hover:text-black"
                            } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
                    >
                        {isSubmitting ? (
                            <LoadingDots color="#808080" />
                        ) : (
                            <p>Login</p>
                        )}
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default LoginForm;