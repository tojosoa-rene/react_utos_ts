import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";

import ForgotPassword from "../../ForgotPassword";
import UserRepositoryImpl from "../../../../infrastructure/api/UserRepositoryImpl";
import UserAPI from "../../../../infrastructure/api/UserAPI";

vi.mock("../../../../infrastructure/api/UserAPI");

describe("Integration Test - ForgotPassword", () => {
  let forgotPassword;
  let userAPIInstance;

  beforeEach(() => {
    // mock API layer
    userAPIInstance = new UserAPI();

    userAPIInstance.forgotPassword = vi.fn().mockResolvedValue({
      message: "Email sent"
    });

    // real repository (but injected fake API)
    const repo = new UserRepositoryImpl();
    repo.api = userAPIInstance;

    // use case
    forgotPassword = new ForgotPassword(repo);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should send forgot password request through full flow", async () => {
    const result = await forgotPassword.execute("test@mail.com");

    expect(userAPIInstance.forgotPassword).toHaveBeenCalledWith(
      "test@mail.com"
    );

    expect(result).toEqual({
      message: "Email sent"
    });
  });

  test("should throw error when API fails", async () => {
    userAPIInstance.forgotPassword.mockRejectedValue(
      new Error("User not found")
    );

    await expect(forgotPassword.execute("wrong@mail.com"))
      .rejects
      .toThrow("User not found");
  });
});