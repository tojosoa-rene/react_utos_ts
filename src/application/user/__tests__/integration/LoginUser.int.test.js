import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";

import LoginUser from "../../LoginUser";
import UserRepositoryImpl from "../../../../infrastructure/api/UserRepositoryImpl";
import UserAPI from "../../../../infrastructure/api/UserAPI";

// Mock de UserAPI pour simuler les appels HTTP
vi.mock("../../../../infrastructure/api/UserAPI");

describe("Integration Test - LoginUser", () => {
  let loginUser;
  let userAPIInstance;

  beforeEach(() => {
    // create mocked instance
    userAPIInstance = new UserAPI();

    // override method login (mock HTTP layer)
    // Quand userAPIInstance.login() est appelé, retourne une promesse résolue avec un token et des données utilisateur
    userAPIInstance.login = vi.fn().mockResolvedValue({
      token: "real-token",
      user: { id: 1, email: "test@mail.com" }
    });

    // Injection du mock API dans le repository
    // Création du vrai repository (implémentation réelle)
    const repo  = new UserRepositoryImpl();
    // Remplace la propriété api du repository par notre instance mockée de UserAPI
    repo.api    = userAPIInstance;

    // use case
    loginUser = new LoginUser(repo);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should login user via repository + API flow", async () => {
    const result = await loginUser.execute("test@mail.com", "1234");

    expect(userAPIInstance.login).toHaveBeenCalledWith(
      "test@mail.com",
      "1234"
    );

    expect(result).toEqual({
      token: "real-token",
      user: { id: 1, email: "test@mail.com" }
    });
  });
});