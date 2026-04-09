class ResetPassword {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(token, newPassword) {
        return await this.userRepository.resetPassword(token, newPassword);
    }
}

export default ResetPassword;