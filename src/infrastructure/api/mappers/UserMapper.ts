// Ce fichier contient une fonction de mappage qui convertit les données reçues de l'API (LoginResponseDTO) 
//  en un format plus adapté à l'utilisation dans l'application (User et token).
// - cela permet de séparer la logique de transformation des données de la logique d'accès aux données 
// (dans les repositories) et de la logique métier (dans les use cases)
// - le mappage est fait dans une fonction dédiée, ce qui facilite la maintenance et 
//  l'évolution du code (si la structure des données change, il suffit de modifier le mapper)

import { LoginResponseDTO } from "../dto/LoginResponseDTO";
import { User } from "../../../domain/user/User";

export const mapToUser = (dto: LoginResponseDTO): { user: User; token: string } => {
  return {
    user: {
      id: dto.id,
      name: dto.name,
      email: dto.email,
      role: dto.role,
    },
    token: dto.token,
  };
};