import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {

    const navigate  = useNavigate();
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();
    const { register, watch, handleSubmit, formState: {errors} } = useForm<RegisterFormData>();

    const mutation = useMutation({
        mutationFn: apiClient.register,
        onSuccess: async () => {
            queryClient.invalidateQueries({queryKey: ["validateToken"]})
            showToast({ message: "Registration Successful!", type: "SUCCESS"});
            navigate('/');
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR"});
        }
    });

    const submit = handleSubmit( (data) => {
        mutation.mutate(data);
    })
    return (
        <form action="" className="flex flex-col gap-5" onSubmit={submit}>
            <h2 className="text-3xl font-bold ">Create an Account</h2>
            <div className="flex flex-col justify-center gap-5 md:flex-row">
                <span className="flex flex-col flex-1">
                    <label htmlFor="" className=" font-semibold mb-2">First Name</label>
                    <input type="text" className="rounded-sm bg-slate-100 px-3 py-2 border border-gray-300"
                    {...register('firstName', {required: "This field is required"})}/>
                    {errors.firstName && (
                        <span className="text-red-500">{errors.firstName.message}</span>
                    )}
                </span>
                <span className="flex flex-col flex-1">
                    <label htmlFor="" className=" font-semibold mb-2">Last Name</label>
                    <input type="text" className="rounded-sm bg-slate-100 px-3 py-2 border border-gray-300"
                    {...register("lastName", {required: "This field is required"})}/>
                    {errors.lastName && (
                        <span className="text-red-500">{errors.lastName.message}</span>
                    )}
                </span>
            </div>
            <div className="flex">
                <span className="flex flex-col flex-1">
                    <label htmlFor="" className=" font-semibold mb-2">Email</label>
                    <input type="email" className="rounded-sm bg-slate-100 px-3 py-2 border border-gray-300"
                    {...register("email", {required: "This field is required"})}/>
                    {errors.email && (
                        <span className="text-red-500">{errors.email.message}</span>
                    )}
                </span>
            </div>
            <div className="flex">
                <span className="flex flex-col flex-1">
                    <label htmlFor="" className=" font-semibold mb-2">Password</label>
                    <input type="password" className="rounded-sm bg-slate-100 px-3 py-2 border border-gray-300"
                     {...register("password", {required: "This field is required", minLength:{
                        value: 6,
                        message: "password must be a minimum of 6 characters"
                     }})}/>
                     {errors.password && (
                        <span className="text-red-500">{errors.password.message}</span>
                    )}
                </span>
            </div>
            <div className="flex">
                <span className="flex flex-col flex-1">
                    <label htmlFor="" className=" font-semibold mb-2">Confirm Password</label>
                    <input type="password" className="rounded-sm bg-slate-100 px-3 py-2 border border-gray-300"
                     {...register("confirmPassword", {
                        validate: (val) => {
                            if(!val){
                                return "This field is required"
                            } else if(watch("password") !== val) {
                                return "Your passwords do not match"
                            }

                        },
                     })}/>
                     {errors.confirmPassword && (
                        <span className="text-red-500">{errors.confirmPassword.message}</span>
                    )}
                </span>
            </div>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <span>Already registered?</span>
                    <Link to='/sign-in' className="underline hover:cursor-pointer">Login Here</Link>
                </div>
                  <button type="submit" className="py-3 px-2 bg-blue-500 rounded-sm text-white font-semibold 
                  hover:cursor-pointer hover:bg-blue-400">Create Account</button>
            </div>
          
        </form>
    )
}

export default Register;