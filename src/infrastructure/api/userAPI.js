import API from "./axiosInstance";

export default class UserAPI {
    async login(email, password) {
        const res = await API.post("/login", { email, password });
        return res.data;
    }

    async forgotPassword(email) {
        const res = await API.post("/forgot-password", { email });
        return res.data;
    }

    async resetPassword(token, newPassword) {
        const res = await API.post("/reset-password", { 
            token,
            newPassword 
        });
        
        return res.data;    
    }
}