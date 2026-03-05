# Unit Testing Practice (TypeScript & Hono)

Proyek latihan untuk menerapkan unit testing pada aplikasi web sederhana menggunakan TypeScript dan framework Hono. Proyek ini mendemonstrasikan implementasi _password validation_ dengan arsitektur DDD-lite dan prinsip SOLID.

## 🚀 Tech Stack

- **Framework**: [Hono](https://hono.dev/)
- **Runtime**: [Node.js](https://nodejs.org/) dengan `@hono/node-server`
- **Testing**: [Vitest](https://vitest.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Runner**: [tsx](https://tsx.is/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📋 Prasyarat (Prerequisites)

Sebelum memulai, pastikan Anda telah menginstal:

- **Node.js** (versi 18 atau lebih baru)
- **pnpm** (`npm install -g pnpm`)

## 🛠️ Cara Instalasi & Menjalankan

1. **Clone repository**:

   ```bash
   git clone git@github.com:TurtleMapple/unit-testing-practice.git
   cd unit-testing-practice
   ```

2. **Instal dependensi**:

   ```bash
   pnpm install
   ```

3. **Menjalankan aplikasi (Mode Dev)**:

   ```bash
   pnpm run dev
   ```

4. **Menjalankan pengujian (Unit Test)**:

   ```bash
   # Menjalankan test sekali saja
   pnpm exec vitest run

   # Menjalankan test dalam mode watch
   pnpm exec vitest
   ```

## 📂 Struktur Folder

```text
src/
├── domain/            # Inti bisnis (Domain Logic)
│   ├── entities/      # Objek bisnis
│   ├── services/      # Logika aplikasi (PasswordService)
│   └── validators/    # Aturan validasi (Interface & Implementation)
│       └── Test/      # Unit Test spesifik validator
├── routes/            # Konfigurasi endpoint
├── index.ts           # Entry point aplikasi
└── index.test.ts      # Integration test dasar
```
