class LoginUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(email, password) {
        return this.userRepository.login(email, password);
    }
}

export default LoginUser;