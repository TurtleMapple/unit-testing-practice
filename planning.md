# Perencanaan Proyek: Validasi Password & Keamanan (Latihan Unit Testing)

Dokumen ini berisi rencana arsitektur dan langkah-langkah untuk membangun fitur validasi password menggunakan **Hono**, **Vitest**, dan **pnpm**, dengan menerapkan prinsip **DDD (Domain-Driven Design)** dan **SOLID**.

## 🏗️ Arsitektur (DDD Lite)

Untuk menjaga kode tetap _scalable_ dan _testable_, kita akan membagi kode menjadi beberapa layer:

1.  **Domain Layer**: Berisi aturan bisnis inti (Logic). Tidak boleh bergantung pada framework (Hono) atau library eksternal selain yang esensial.
2.  **Application Layer**: Berisi _Use Case_. Mengkoordinasikan bagaimana domain logic digunakan.
3.  **Infrastructure Layer**: Berisi implementasi teknis seperti HTTP server (Hono) dan instalasi dependency.

## 📂 Struktur Folder Proyek (Updated)

```text
src/
├── domain/
│   ├── services/
│   │   └── password.service.ts              # Koordinator logika bisnis
│   ├── validators/
│   │   ├── password-validator.interface.ts  # [SOLID - I & D] Interface untuk validator
│   │   └── regex-password-validator.ts      # [SOLID - S] Implementasi validator inti
│   └── entities/                            # Domain Models (jika ada)
├── routes/
│   └── routes.ts                            # Endpoint Hono (Infrastructure)
├── index.ts                                 # Entry point & Dependency Injection
└── index.test.ts                            # Integration tests (HTTP Layer)
```

## 🧪 Rencana Pengujian (Testing Plan)

Untuk membangun sistem yang tangguh, kita akan melakukan pengujian di tiga level utama:

### 1. Unit Test: Validator (`regex-password-validator.test.ts`)

Fokus pada **Logika Bisnis Murni**. Tes ini harus sangat mendalam karena di sinilah aturan keamanan password berada.

- **Happy Path**: Memastikan password yang memenuhi syarat (8+ char, angka, huruf besar) dianggap valid.
- **Sad Path**: Mencakup semua kegagalan: terlalu pendek, tidak ada angka, tidak ada huruf besar.
- **Edge Cases**: Password berisi spasi saja, atau password yang sangat panjang (1000+ karakter) untuk memastikan tidak ada masalah performa/buffer.

### 2. Unit Test: Service (`password.service.test.ts`)

Fokus pada **Orkestrasi**. Di sini kita menggunakan **Mocking**.

- Kita akan melakukan _mocking_ pada `IPasswordValidator`. Kita tidak peduli aturan regex di sini.
- Tujuannya memastikan `PasswordService` benar-benar memanggil metode `validate` dari validator dan mengembalikan hasilnya secara utuh.

### 3. Integration Test: Hono API (`index.test.ts`)

Fokus pada **HTTP Layer**. Memastikan "pintu masuk" aplikasi kita bekerja.

- **Status Code**: 200 untuk valid, 400 untuk invalid/bad request.
- **Respon JSON**: Memastikan format error message mudah dibaca oleh frontend.
- **Pesan Error**: Memastikan jika body kosong atau JSON salah, API tidak _crash_.

## 📐 Penerapan SOLID

- **S (Single Responsibility)**: `RegexPasswordValidator` hanya mengurusi cara mengecek string. `PasswordService` hanya mengurusi alur bisnis.
- **O (Open/Closed)**: Jika ingin menambah validasi via API external (misal: HaveIBeenPwned), cukup buat implementasi baru dari `IPasswordValidator` tanpa mengubah kode di Service.
- **D (Dependency Inversion)**: `PasswordService` bergantung pada `IPasswordValidator` (interface), bukan `RegexPasswordValidator` (class konkret).

---

> [!TIP]
> Gunakan `pnpm add -D vitest` untuk menginstal tools testing.
> Gunakan `import type` untuk interface agar build lebih optimal di ESM.
