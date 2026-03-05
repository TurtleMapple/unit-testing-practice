import type { IPasswordValidator, ValidationResult } from "./password-validator.interface";

/**
 * Implementasi validator password menggunakan regular expression.
 * Memastikan password memenuhi kriteria keamanan standar.
 */
export class RegexPasswordValidator implements IPasswordValidator {
  /**
   * Memvalidasi password berdasarkan aturan:
   * 1. Minimal 8 karakter.
   * 2. Mengandung minimal satu angka.
   * 3. Mengandung minimal satu huruf besar.
   * 4. Tidak boleh hanya berisi spasi.
   */
  validate(password: string): ValidationResult {
    const errors: string[] = [];

    // 1. Happy/Sad Path: Cek panjang minimal
    if (password.length < 8) {
      errors.push("Panjang password minimal 8 karakter");
    }

    // 2. Happy/Sad Path: Cek keberadaan angka
    if (!/\d/.test(password)) {
      errors.push("Password harus mengandung minimal satu angka");
    }

    // 3. Happy/Sad Path: Cek keberadaan huruf besar
    if (!/[A-Z]/.test(password)) {
      errors.push("Password harus mengandung minimal satu huruf besar");
    }

    // 4. Edge Case: Hanya berisi spasi
    if (password.length > 0 && password.trim().length === 0) {
      errors.push("Password tidak boleh hanya berisi spasi");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
