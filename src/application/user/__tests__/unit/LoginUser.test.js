import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import LoginUser from "../../LoginUser";

describe("LoginUser use case", () => {
  const fakeRepo = {
    login: vi.fn() // fonction (vide) mock pour simuler le comportement de login dans UserRepositoryImpl
  };

  let loginUser;

  beforeEach(() => {
    // lorsque la méthode loginUser.execute() est appelée, c'est la méthode fakeRepo.login qui est utilisée
    loginUser = new LoginUser(fakeRepo); 
  });

  afterEach(() => {
    vi.clearAllMocks(); // reset les mocks
  });

  // test success
  test("should return user data on success", async () => {
    fakeRepo.login.mockResolvedValue({ token: "123" });

    const result = await loginUser.execute("test@mail.com", "1234");

    // Vérifie que fakeRepo.login a été appelé avec les bons arguments
    expect(fakeRepo.login).toHaveBeenCalledWith("test@mail.com", "1234" ); 

    // Vérifie que le résultat de loginUser.execute() est ce qu'on a défini dans mockResolvedValue
    expect(result).toEqual({ token: "123" }); 
  });

  // test erreur
  test("should throw error when login fails", async () => {
    // Quand login() est appelé, retourne une promesse rejetée avec une erreur "Invalid credentials"
    fakeRepo.login.mockRejectedValue(new Error("Invalid credentials"));

    // Vérifie que loginUser.execute() rejette une erreur avec le message "Invalid credentials"
    await expect(loginUser.execute("wrong@mail.com", "0000")) 
      .rejects // attend que la promesse soit rejetée
      .toThrow("Invalid credentials"); // vérifie que l'erreur rejetée a le message "Invalid credentials"
    });
});