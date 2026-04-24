// test d'intégration du use case LoginUser
// - on utilise un mock de l'API pour simuler les appels réseau, mais on teste le flow complet du use case à travers le repository et l'API
// - cela permet de vérifier que les différentes couches de l'application fonctionnent correctement ensemble, et que les données sont bien transmises du use case à l'API

import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";

import LoginUser from "../../LoginUser";
import UserRepositoryImpl from "../../../../infrastructure/api/UserRepositoryImpl";
import UserAPI from "../../../../infrastructure/api/UserAPI";

vi.mock("../../../../infrastructure/api/UserAPI");

describe("Integration Test - LoginUser", () => {

  let loginUser: LoginUser;
  let userAPIInstance: any;

  beforeEach(() => {
    userAPIInstance = new UserAPI();

    userAPIInstance.login = vi.fn().mockResolvedValue({
      token: "real-token",
      user: { id: 1, email: "test@mail.com" }
    });

    const repo = new UserRepositoryImpl();

    // typage propre
    (repo as any).api = userAPIInstance;

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