import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";

import ResetPassword from "../../ResetPassword";
import UserRepositoryImpl from "../../../../infrastructure/api/UserRepositoryImpl";
import UserAPI from "../../../../infrastructure/api/UserAPI";

vi.mock("../../../../infrastructure/api/UserAPI");

describe("Integration Test - ResetPassword", () => {

  let resetPassword: ResetPassword;
  let userAPIInstance: any;

  beforeEach(() => {
    // mock API layer
    userAPIInstance = new UserAPI();

    userAPIInstance.resetPassword = vi.fn().mockResolvedValue({
      message: "Password updated"
    });

    // repository réel + injection mock
    const repo = new UserRepositoryImpl();

    // injection API mockée
    (repo as any).api = userAPIInstance;

    // use case
    resetPassword = new ResetPassword(repo);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should reset password through full flow", async () => {
    const result = await resetPassword.execute(
      "token123",
      "newPass123"
    );

    expect(userAPIInstance.resetPassword).toHaveBeenCalledWith(
      "token123",
      "newPass123"
    );

    expect(result).toEqual({
      message: "Password updated"
    });
  });

  test("should throw error when API rejects resetPassword", async () => {
    userAPIInstance.resetPassword.mockRejectedValue(
      new Error("Invalid token")
    );

    await expect(
      resetPassword.execute("wrongToken", "pass")
    ).rejects.toThrow("Invalid token");
  });

});