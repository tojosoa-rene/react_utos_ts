import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import ForgotPassword from "../../ForgotPassword";
import { UserRepository } from "../../../../domain/user/UserRepository";

describe("ForgotPassword use case", () => {

  let fakeRepo: UserRepository;
  let forgotPassword: ForgotPassword;

  beforeEach(() => {
    fakeRepo = {
      login: vi.fn(),
      forgotPassword: vi.fn(),
      resetPassword: vi.fn()
    };

    forgotPassword = new ForgotPassword(fakeRepo);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should call forgotPassword and return response", async () => {
    (fakeRepo.forgotPassword as any).mockResolvedValue({
      message: "Email sent"
    });

    const result = await forgotPassword.execute("test@mail.com");

    expect(fakeRepo.forgotPassword).toHaveBeenCalledWith("test@mail.com");
    expect(result).toEqual({ message: "Email sent" });
  });

  test("should throw error when fails", async () => {
    (fakeRepo.forgotPassword as any).mockRejectedValue(
      new Error("User not found")
    );

    await expect(
      forgotPassword.execute("wrong@mail.com")
    ).rejects.toThrow("User not found");
  });
});