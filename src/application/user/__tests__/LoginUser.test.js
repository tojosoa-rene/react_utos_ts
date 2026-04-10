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