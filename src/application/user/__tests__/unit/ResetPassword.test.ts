import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import ResetPassword from "../../ResetPassword";
import { UserRepository } from "../../../../domain/user/UserRepository";

describe("ResetPassword use case", () => {

  let fakeRepo: UserRepository;
  let resetPassword: ResetPassword;

  beforeEach(() => {
    fakeRepo = {
       login: vi.fn(),
      forgotPassword: vi.fn(),
      resetPassword: vi.fn()
    };
    resetPassword = new ResetPassword(fakeRepo);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // success
  test("should call resetPassword and return response", async () => {
    (fakeRepo.resetPassword as any).mockResolvedValue({
      message: "Password updated"
    });
    
    const result = await resetPassword.execute("token123", "newPass123");

    expect(fakeRepo.resetPassword).toHaveBeenCalledWith("token123", "newPass123");
    expect(result).toEqual({ message: "Password updated" });
  });

  // erreur
  test("should throw error when resetPassword fails", async () => {
    (fakeRepo.resetPassword as any).mockRejectedValue(new Error("Invalid token"));

    await expect(resetPassword.execute("wrongToken", "pass"))
      .rejects
      .toThrow("Invalid token");
  });

});