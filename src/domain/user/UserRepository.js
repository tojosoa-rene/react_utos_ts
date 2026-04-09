// contrat global pour les opérations liées à l'utilisateur
export default class UserRepository {
    login(email, password) {
        throw new Error("Not implemented");
    }

    forgotPassword(email) {
        throw new Error("Not implemented");
    }

    resetPassword(token, newPassword) {
        throw new Error("Not implemented");
    }
}
