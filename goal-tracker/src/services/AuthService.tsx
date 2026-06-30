import { handleError } from "@/helpers/ErrorHandler";
import axios from "axios";
import { UserProfileToken } from "@/types/user";
const api = "http://localhost:3000/api"

export const loginApi = async (username: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "/account/login", {
            username: username,
            password: password,
        });
        return data;
    } catch(error) {
        handleError(error);
    }
}

export const registerApi = async (username: string, email: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "/account/register", {
            username: username,
            email: email, 
            password: password,
        });
        return data;
    } catch(error) {
        handleError(error);
    }
}
