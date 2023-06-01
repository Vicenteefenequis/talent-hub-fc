
"use client";
import LoadingDots from '@/components/LoadingDots';
import { FormikProps, withFormik } from 'formik';
import { signIn } from "next-auth/react";
import React from 'react';
import { toast } from 'react-hot-toast';


type Values = {
    email: string;
    password: string;
}



const Form: React.FC<FormikProps<Values>> = ({ handleSubmit, isSubmitting, values, setFieldValue }) => {
    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
            <div>
                <label
                    htmlFor="email"
                    className="block text-xs text-gray-600 uppercase"
                >
                    Email Address
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={(e) => setFieldValue("email", e.target.value)}
                    placeholder="panic@thedis.co"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="block text-xs text-gray-600 uppercase"
                >
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    value={values.password}
                    required
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
            </div>

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
                    <p>login</p>
                )}
            </button>
        </form>
    );
}

const LoginForm = withFormik<{}, Values>({
    handleSubmit: (values, { setSubmitting }) => {
        signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
        }).then((response) => {
            if (response?.error) {
                toast.error(response.error)
                setSubmitting(false)
            } else {
                toast.success("Logged in!")
                window.location.href = "/"
            }
        }).catch(error => {
            toast.error(error)
        })
    }
})(Form)

export default LoginForm;