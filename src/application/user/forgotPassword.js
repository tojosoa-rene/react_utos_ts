class ForgotPassword {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(email) {
        return await this.userRepository.forgotPassword(email);
    }
}

export default ForgotPassword;