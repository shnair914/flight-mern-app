import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: apiClient.logout,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
            showToast({message: "Logout Successful!", type: "SUCCESS"});
            navigate('/sign-in');
        },
        onError: (error: Error) => {
            showToast({message: error.message, type: "ERROR" });
        }
    })

    const handleClick = () => {
        mutation.mutate();
    }

    return (
        <button className="p-4 bg-blue-500 text-white font-semibold rounded-sm
        hover:cursor-pointer hover:bg-blue-400" onClick={handleClick}>
            Sign Out
        </button>
    )
}

export default SignOutButton;

