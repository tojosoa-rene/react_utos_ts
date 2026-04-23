
// Pourquoi une interface et pas une classe ?
/** - une interface définit un contrat que les classes peuvent implémenter, sans fournir d'implémentation concrète
 *  - cela permet de séparer la définition des méthodes (contrat) de leur implémentation, 
 *    ce qui est plus flexible et facilite les tests unitaires (on peut facilement mocker une interface)
 *  - en TypeScript, les interfaces sont souvent utilisées pour définir des contrats pour les services ou les repositories, 
 *    tandis que les classes sont utilisées pour fournir des implémentations concrètes de ces contrats
 */
import { User } from "./User";

// CONTRAT HEXAGONAL (très important)
export interface UserRepository {

  // login retourne un User + token (à adapter selon API)
  login(email: string, password: string): Promise<{
    success: boolean;
    user: User;
    token: string;
  }>;

  forgotPassword(email: string): Promise<{ message: string }>;

  resetPassword(token: string, newPassword: string): Promise<{ message: string }>;
}
