import API from "./axiosInstance";

export default class UserAPI {
    async login(email, password) {
        const res = await API.post("/login", { email, password });
        return res.data;
    }
}
