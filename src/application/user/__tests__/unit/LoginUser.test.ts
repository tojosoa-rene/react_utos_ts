// test unitaire du use case LoginUser
// - on utilise un mock du UserRepository pour simuler les appels réseau et tester la logique métier du use case de manière isolée
// - on vérifie que le use case retourne les données attendues en cas de succès, et qu'il gère correctement les erreurs

import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import LoginUser from "../../LoginUser";
import { UserRepository } from "../../../../domain/user/UserRepository";
import { AuthResult } from "../../../../domain/user/types"; // si tu l’as créé

describe("LoginUser use case", () => {

  // mock typé propre
  let fakeRepo: UserRepository;
  let loginUser: LoginUser;

  beforeEach(() => {
    fakeRepo = {
      login: vi.fn(),
      forgotPassword: vi.fn(),
      resetPassword: vi.fn()
    };

    loginUser = new LoginUser(fakeRepo);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should return user data on success", async () => {

    const mockResponse: AuthResult = {
      token: "123",
      user: {
        id: 1,
        name: "test",
        email: "test@mail.com",
        role: "USER"
      }
    };

    (fakeRepo.login as any).mockResolvedValue(mockResponse);

    const result = await loginUser.execute("test@mail.com", "1234");

    expect(fakeRepo.login).toHaveBeenCalledWith("test@mail.com", "1234");
    expect(result).toEqual(mockResponse);
  });

  test("should throw error when login fails", async () => {
    (fakeRepo.login as any).mockRejectedValue(new Error("Invalid credentials"));

    await expect(
      loginUser.execute("wrong@mail.com", "0000")
    ).rejects.toThrow("Invalid credentials");
  });
});