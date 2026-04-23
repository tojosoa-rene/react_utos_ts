// class ForgotPassword {
//     constructor(userRepository) {
//         this.userRepository = userRepository;
//     }

//     async execute(email) {
//         return await this.userRepository.forgotPassword(email);
//     }
// }

// export default ForgotPassword;

import { UserRepository } from "../../domain/user/UserRepository";

export default class ForgotPassword {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string) {
    return this.userRepository.forgotPassword(email);
  }
}