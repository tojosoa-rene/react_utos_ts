import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import ForgotPassword from "../../ForgotPassword";

describe("ForgotPassword use case", () => {

  const fakeRepo = {
    forgotPassword: vi.fn()
  };

  let forgotPassword;

  beforeEach(() => {
    forgotPassword = new ForgotPassword(fakeRepo);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // test success
  test("should call forgotPassword and return response", async () => {
    fakeRepo.forgotPassword.mockResolvedValue({ message: "Email sent" });

    const result = await forgotPassword.execute("test@mail.com");

    expect(fakeRepo.forgotPassword).toHaveBeenCalledWith("test@mail.com");
    expect(result).toEqual({ message: "Email sent" });
  });

  // test erreur
  test("should throw error when forgotPassword fails", async () => {
    fakeRepo.forgotPassword.mockRejectedValue(new Error("User not found"));

    await expect(forgotPassword.execute("wrong@mail.com"))
      .rejects
      .toThrow("User not found");
  });

});