TEST UNIT REACT (concernant les useCase ou application)

Question à poser : “Est-ce que mon use case fonctionne bien ?”
---------------

Structure : 
---------
src/
│
├── domain/                # business logic (indépendant)
│   └── user/
│       ├── User.js
│       └── UserService.js
│
├── application/           # use cases
│   └── user/
│       ├── LoginUser.js              # use case
│       └── __tests__/LoginUser.test.js   # tests du use case
│
├── infrastructure/        # API / external services
│   └── api/
│       └── UserRepositoryImpl.js     # API calls
│
├── ui/                    # React components
│   └── pages/
│       └── Login.jsx
│
├── store/                 # Redux slices
│   └── features/
│       └── auth/
│           └── authSlice.js


Installation Jest dans vite : 
---------------------------
npm install -D vitest @testing-library/react

Config dans package.json : 
--------------------------
 "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview", 
    "test": "vitest"  // a mettre
  },

Créer un fichier de test : (soit .test.js ou .spec.js)
-------------------------
  exemple  : application/user/__tests__/LoginUser.test.j => Pour tester l'useCase LoginUser.js (cad : la fonction login)
  -------
// application/user/__tests__/LoginUser.test.js
import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import LoginUser from "../LoginUser";

describe("LoginUser use case", () => {
  // Fake repository pour simuler le comportement du repository réel
  const fakeRepo = {
    login: vi.fn() // fonction mock
  };

  let loginUser;

  beforeEach(() => {
    loginUser = new LoginUser(fakeRepo);
  });

  afterEach(() => {
    vi.clearAllMocks(); // reset les mocks
  });

  // test success
  test("should return user data on success", async () => {
    fakeRepo.login.mockResolvedValue({ token: "123" });

    const result = await loginUser.execute("test@mail.com", "1234");

    expect(fakeRepo.login).toHaveBeenCalledWith("test@mail.com", "1234" );
    expect(result).toEqual({ token: "123" });
  });

  // test erreur
  test("should throw error when login fails", async () => {
    fakeRepo.login.mockRejectedValue(new Error("Invalid credentials"));

    await expect(loginUser.execute("wrong@mail.com", "0000"))
      .rejects
      .toThrow("Invalid credentials");
  });
});


Lancer le test : npm test
--------------
