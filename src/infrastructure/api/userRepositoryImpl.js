import UserRepository from "../../domain/user/UserRepository";
import UserAPI from "./userAPI";

class UserRepositoryImpl extends UserRepository {   
    constructor() {
        super();
        this.api = new UserAPI();
    }
    
    async login(email, password) {
        // API Call
        return this.api.login(email, password);
    }

    async forgotPassword(email) {
        return this.api.forgotPassword(email);
    }
}

export default UserRepositoryImpl;