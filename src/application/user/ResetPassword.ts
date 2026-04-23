// class ResetPassword {
//     constructor(userRepository) {
//         this.userRepository = userRepository;
//     }

//     async execute(token, newPassword) {
//         return await this.userRepository.resetPassword(token, newPassword);
//     }
// }

// export default ResetPassword;

import { UserRepository } from "../../domain/user/UserRepository";

export default class ResetPassword {
  constructor(private userRepository: UserRepository) {}

  async execute(token: string, newPassword: string) {
    return this.userRepository.resetPassword(token, newPassword);
  }
}