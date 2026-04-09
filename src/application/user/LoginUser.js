class LoginUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(email, password) {
        return this.userRepository.login(email, password); // this.userRepository = new UserRepositoryImpl()
    }
}

export default LoginUser;