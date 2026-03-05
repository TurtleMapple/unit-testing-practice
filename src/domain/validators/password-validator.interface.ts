/**
 * Menampilkan hasil dari proses validasi password.
 */
export interface ValidationResult {
  /** Menunjukkan apakah password memenuhi semua kriteria keamanan. */
  isValid: boolean;
  /** Daftar pesan error jika password tidak valid. Kosong jika isValid adalah true. */
  errors: string[];
}

/**
 * Interface untuk validator password. 
 * Mengikuti prinsip Dependency Inversion (SOLID) dan DDD Domain Layer.
 */
export interface IPasswordValidator {
  /**
   * Melakukan validasi terhadap string password berdasarkan aturan bisnis tertentu.
   * @param password - String password yang akan divalidasi.
   * @returns Objek ValidationResult yang berisi status validitas dan pesan error jika ada.
   */
  validate(password: string): ValidationResult;
}

