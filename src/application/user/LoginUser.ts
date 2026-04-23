// use case pour la connexion de l'utilisateur
// - LoginUser encapsule la logique métier de la connexion, en utilisant le UserRepository pour faire les appels réseau
// - cela permet de séparer la logique métier (dans les use cases) de la logique d'accès aux données (dans les repositories)

import { UserRepository } from "../../domain/user/UserRepository";

// typage du constructeur
export default class LoginUser {
    // injection de dépendance du repository dans le use case -encapsulation de la logique métier dans le use case
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string) {
    return this.userRepository.login(email, password);
  }
}