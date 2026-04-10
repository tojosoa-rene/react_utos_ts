import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import ResetPassword from "../ResetPassword";

describe("ResetPassword use case", () => {

  const fakeRepo = {
    resetPassword: vi.fn()
  };

  let resetPassword;

  beforeEach(() => {
    resetPassword = new ResetPassword(fakeRepo);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // success
  test("should call resetPassword and return response", async () => {
    fakeRepo.resetPassword.mockResolvedValue({ message: "Password updated" });

    const result = await resetPassword.execute("token123", "newPass123");

    expect(fakeRepo.resetPassword).toHaveBeenCalledWith("token123", "newPass123");
    expect(result).toEqual({ message: "Password updated" });
  });

  // erreur
  test("should throw error when resetPassword fails", async () => {
    fakeRepo.resetPassword.mockRejectedValue(new Error("Invalid token"));

    await expect(resetPassword.execute("wrongToken", "pass"))
      .rejects
      .toThrow("Invalid token");
  });

});