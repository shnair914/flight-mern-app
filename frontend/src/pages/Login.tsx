import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from '../api-client';
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export type LoginFormData = {
    email: string;
    password: string;
}

const Login = () => {

    const clientQuery = useQueryClient();
    const { register, handleSubmit,  formState: { errors } } = useForm<LoginFormData>();
    const { showToast } = useAppContext();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: apiClient.login,
        onSuccess: async () => {
            clientQuery.invalidateQueries({queryKey: ["validateToken"]});
            showToast({message: "Login Successful!", type: "SUCCESS"});
            navigate('/')
        },
        onError: (error: Error) => {
            showToast({message: error.message, type: "ERROR"});
        }
    })

    const submit = handleSubmit( (data) => {
        mutation.mutate(data);
    }) 

    return (
        <div>
            <form action="" className="flex flex-col gap-5" onSubmit={submit}>
                <h2 className="text-3xl font-bold tracking-tight">Login Here</h2>
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
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <span>Don't Have an Account?</span>
                        <Link to='/register' className="underline">Sign up here</Link>
                    </div>
                    <button className="p-4 rounded-sm bg-blue-500 text-white hover:cursor-pointer
                    hover:bg-blue-400 font-semibold" type="submit">Login</button>
                </div>
            </form>
        </div>
       
        
    )
}

export default Login;