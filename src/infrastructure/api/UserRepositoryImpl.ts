// Remarque : Si on oublie une méthode -> TypeScript nous avertira
// - UserRepositoryImpl est une implémentation concrète de l'interface UserRepository, qui utilise UserAPI pour faire les appels réseau
// - cela permet de séparer la logique métier (dans les use cases) de la logique d'accès aux données (dans les repositories)

import { UserRepository } from "../../domain/user/UserRepository";
import { mapToUser } from "./mappers/UserMapper";
import UserAPI from "./UserAPI";

class UserRepositoryImpl implements UserRepository {
    
    private api: UserAPI;

    constructor() {
        // super();
        this.api = new UserAPI();
    }
    
    async login(email: string, password: string) {
        // API Call
        // return this.api.login(email, password);
        const response = await this.api.login(email, password);

        // Mapping de la réponse de l'API vers le format attendu par l'application
        // (User et token)
        return mapToUser(response);
    }

    async forgotPassword(email: string) {
        return this.api.forgotPassword(email);
    }

    async resetPassword(token: string, newPassword: string) {
        return this.api.resetPassword(token, newPassword);
    }

}

export default UserRepositoryImpl;

