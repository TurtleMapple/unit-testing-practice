import type { IPasswordValidator, ValidationResult } from "../validators/password-validator.interface";

/**
 * Service untuk mengelola logika aplikasi terkait password.
 * Menerapkan prinsip Dependency Injection untuk fleksibilitas testing.
 */
export class PasswordService {
  /**
   * @param passwordValidator - Implementasi validator yang diinjeksikan (SOLID - D).
   */
  constructor(private passwordValidator: IPasswordValidator) {}

  /**
   * Menangani proses validasi password.
   * Service ini bisa ditambahkan logika tambahan seperti pengecekan ke database
   * atau logging di masa depan tanpa mengubah core validator.
   */
  validatePassword(password: string): ValidationResult {
    return this.passwordValidator.validate(password);
  }
}
