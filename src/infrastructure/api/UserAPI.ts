// Ce fichier contient la classe UserAPI qui gère les appels API liés à l'utilisateur
// - il utilise une instance Axios préconfigurée pour faire les requêtes HTTP vers le backend
// - il définit des méthodes pour la connexion, la récupération de mot de passe et la réinitialisation de mot de passe

import API from "./axiosInstance";

export default class UserAPI {
    async login(email: string, password: string) {
        const res = await API.post("/login", { email, password });
        return res.data;
    }

    async forgotPassword(email: string) {
        const res = await API.post("/forgot-password", { email });
        return res.data;
    }

    async resetPassword(token: string, newPassword: string) {
        const res = await API.post("/reset-password", { 
            token,
            newPassword 
        });
        
        return res.data;    
    }
}